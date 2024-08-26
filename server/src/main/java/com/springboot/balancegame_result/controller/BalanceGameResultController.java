package com.springboot.balancegame_result.controller;

import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame.mapper.BalanceGameMapper;
import com.springboot.balancegame.service.BalanceGameService;
import com.springboot.balancegame_comment.mapper.BalanceGameCommentMapper;
import com.springboot.balancegame_result.dto.BalanceGameResultDto;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.balancegame_result.mapper.BalanceGameResultMapper;
import com.springboot.balancegame_result.service.BalanceGameResultService;
import com.springboot.response.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping
@Validated
public class BalanceGameResultController {
    private final BalanceGameResultService balanceGameResultService;
    private final BalanceGameResultMapper balanceGameResultMapper;
    private final BalanceGameService balanceGameService;
    private final BalanceGameMapper balanceGameMapper;
    private final BalanceGameCommentMapper balanceGameCommentMapper;

    private final String DEFAULT_URL = "/balancegame-results";

    public BalanceGameResultController(BalanceGameResultService balanceGameResultService, BalanceGameResultMapper balanceGameResultMapper, BalanceGameService balanceGameService, BalanceGameMapper balanceGameMapper, BalanceGameCommentMapper balanceGameCommentMapper) {
        this.balanceGameResultService = balanceGameResultService;
        this.balanceGameResultMapper = balanceGameResultMapper;
        this.balanceGameService = balanceGameService;
        this.balanceGameMapper = balanceGameMapper;
        this.balanceGameCommentMapper = balanceGameCommentMapper;
    }

    @PostMapping("/balancegames/{balancegame-id}/balancegame-results")
    public ResponseEntity postResult(@PathVariable("balancegame-id") @Positive long gameid,
                                     @Valid @RequestBody BalanceGameResultDto.Post postDto,
                                     Authentication authentication) {
        postDto.setGameId(gameid);

        BalanceGameResult result = balanceGameResultService.createResult(balanceGameResultMapper.postDtoToResult(postDto), authentication);

        BalanceGame game = balanceGameService.findGame(result.getBalanceGame().getBalanceGameId(), authentication);

        return new ResponseEntity<>(new SingleResponseDto<>(balanceGameMapper.gameToGameResponseDto(game, authentication, balanceGameCommentMapper)), HttpStatus.CREATED);
    }
    @GetMapping("/balancegame-results")
    public ResponseEntity getResults(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size,
                                     @Positive @RequestParam(name = "member-id") Long memberId,
                                     Authentication authentication) {
        if (memberId == null)  throw new IllegalArgumentException("Member ID is required");

        Page<BalanceGameResult> pageBalanceGameComment = balanceGameResultService.findResults(page - 1, size, memberId, authentication);

        List<BalanceGameResult> balanceGameResults = pageBalanceGameComment.getContent();

        return new ResponseEntity<>(balanceGameResultMapper.resultsToResponseDtos(balanceGameResults), HttpStatus.OK);
    }
}
