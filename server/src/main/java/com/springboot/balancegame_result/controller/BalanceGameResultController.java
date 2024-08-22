package com.springboot.balancegame_result.controller;

import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame.mapper.BalanceGameMapper;
import com.springboot.balancegame.service.BalanceGameService;
import com.springboot.balancegame_comment.mapper.BalanceGameCommentMapper;
import com.springboot.balancegame_result.dto.BalanceGameResultDto;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.balancegame_result.mapper.BalanceGameResultMapper;
import com.springboot.balancegame_result.service.BalanceGameResultService;
import com.springboot.utils.UriCreator;
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

        URI location = UriCreator.createUri(DEFAULT_URL, result.getResultId());

        /*return ResponseEntity.created(location).build();*/
        BalanceGame game = balanceGameService.findGame(gameid);

        return new ResponseEntity(balanceGameMapper.gameToGameResponseDto(game, authentication, balanceGameCommentMapper), HttpStatus.CREATED);
    }
//    @GetMapping
//    public ResponseEntity getResult(@PathVariable("result-id") @Positive long resultId){
//        BalanceGameResult result = balanceGameResultService.findResult(resultId);
//        return new ResponseEntity(balanceGameResultMapper.resultToResponseDto(result), HttpStatus.OK);
//    }
    @GetMapping("/balancegame-results")
    public ResponseEntity getResults() {
        List<BalanceGameResult> results = balanceGameResultService.findResults();
        return new ResponseEntity(balanceGameResultMapper.resultsToResponseDtos(results), HttpStatus.OK);
    }
}
