package com.springboot.balancegame.controller;

import com.springboot.auth.utils.Principal;
import com.springboot.balancegame.dto.BalanceGameDto;
import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame.mapper.BalanceGameMapper;
import com.springboot.balancegame.service.BalanceGameService;
import com.springboot.balancegame_comment.mapper.BalanceGameCommentMapper;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import com.springboot.response.MultiResponseDto;
import com.springboot.response.SingleResponseDto;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/balancegames")
@Validated
public class BalanceGameController {
    private final BalanceGameService balanceGameService;
    private final BalanceGameMapper balanceGameMapper;
    private final BalanceGameCommentMapper balanceGameCommentMapper;
    private final MemberService memberService;
    private final String DEFAULT_URL = "/balancegames";

    public BalanceGameController(BalanceGameService balanceGameService, BalanceGameMapper balanceGameMapper, BalanceGameCommentMapper balanceGameCommentMapper, MemberService memberService) {
        this.balanceGameService = balanceGameService;
        this.balanceGameMapper = balanceGameMapper;
        this.balanceGameCommentMapper = balanceGameCommentMapper;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity postGame(@Valid @RequestBody BalanceGameDto.Post postDto,
                                    Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Member findMember = memberService.findMember(principal.getMemberId());

        postDto.setNickName(findMember.getNickname());

        BalanceGame balanceGame = balanceGameService.createGame(balanceGameMapper.postDtoToGame(postDto), authentication);

        URI location = UriCreator.createUri(DEFAULT_URL, balanceGame.getBalanceGameId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{game-id}")
    public ResponseEntity getGame(@PathVariable("game-id") @Positive long gameId,
                                  Authentication authentication) {
        BalanceGame game = balanceGameService.findGame(gameId, authentication);

        return new ResponseEntity<>(new SingleResponseDto<>(balanceGameMapper.gameToGameResponseDto(game, authentication, balanceGameCommentMapper)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getGames(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size,
                                   Authentication authentication) {

        Page<BalanceGame> pageBalanceGames = balanceGameService.findGames(page - 1, size, authentication);

        List<BalanceGame> balanceGames = pageBalanceGames.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(balanceGameMapper.gamesToResponseDtos(balanceGames, authentication, balanceGameCommentMapper), pageBalanceGames), HttpStatus.OK);
    }

    @PatchMapping("/{game-id}")
    public ResponseEntity updateStatusGame(@Positive @PathVariable("game-id") long gameId,
                                            Authentication authentication) {
        BalanceGame game = balanceGameService.acceptGame(gameId, authentication);
        return new ResponseEntity<>(new SingleResponseDto<>(balanceGameMapper.gameToGameResponseDto(game, authentication, balanceGameCommentMapper)), HttpStatus.OK);

    }

    @DeleteMapping ("/{game-id}")
    public ResponseEntity deleteGame(@Positive @PathVariable("game-id") long gameId,
                                           Authentication authentication) {
        balanceGameService.deleteGame(gameId, authentication);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
