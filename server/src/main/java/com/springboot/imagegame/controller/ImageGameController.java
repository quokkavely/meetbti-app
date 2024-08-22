package com.springboot.imagegame.controller;

import com.springboot.auth.utils.Principal;
import com.springboot.imagegame.dto.ImageGameDto;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.imagegame.mapper.ImageGameMapper;
import com.springboot.imagegame.service.ImageGameService;
import com.springboot.imagegame_comment.mapper.ImageGameCommentMapper;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
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
@RequestMapping("/imagegames")
@Validated
public class ImageGameController {
    private final ImageGameService imageGameService;
    private final ImageGameMapper imageGameMapper;
    private final ImageGameCommentMapper imageGameCommentMapper;
    private final MemberService memberService;
    private final static String DEFAULT_URL = "/imagegames";

    public ImageGameController(ImageGameService imageGameService, ImageGameMapper imageGameMapper, ImageGameCommentMapper imageGameCommentMapper, MemberService memberService) {
        this.imageGameService = imageGameService;
        this.imageGameMapper = imageGameMapper;
        this.imageGameCommentMapper = imageGameCommentMapper;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity postGame (@Valid @RequestBody ImageGameDto.Post postDto,
                                    Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Member findMember = memberService.findMember(principal.getMemberId());

        postDto.setNickName(findMember.getNickname());

        ImageGame imageGame = imageGameService.createGame(imageGameMapper.imageGamePostDtoToImageGame(postDto), authentication);

        URI location = UriCreator.createUri(DEFAULT_URL, imageGame.getImageGameId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{game-id}")
    public ResponseEntity getGame(@PathVariable("game-id") @Positive long gameId,
                                  Authentication authentication){

        ImageGame game = imageGameService.findGame(gameId);

        return new ResponseEntity(imageGameMapper.gameToGameResponseDto(game, authentication, imageGameCommentMapper), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getGames (Authentication authentication) {
        List<ImageGame> games = imageGameService.findGames();

        return new ResponseEntity(imageGameMapper.gamesToGameResponseDtos(games, authentication,imageGameCommentMapper), HttpStatus.OK);
    }

    @DeleteMapping("/{game-id}")
    public ResponseEntity deleteGames(@PathVariable("game-id") @Positive long gameId){
        imageGameService.deleteGame(gameId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
