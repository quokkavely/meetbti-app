package com.springboot.balancegame.controller;

import com.springboot.auth.utils.Principal;
import com.springboot.balancegame.dto.BalanceGameDto;
import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame.mapper.BalanceGameMapper;
import com.springboot.balancegame.service.BalanceGameService;
import com.springboot.balancegame_comment.mapper.BalanceGameCommentMapper;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.testresult.entity.TestResult;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/balancegames")
@Validated
public class BalanceGameController {
    private final BalanceGameService balanceGameService;
    private final BalanceGameMapper balanceGameMapper;
    private final BalanceGameCommentMapper balanceGameCommentMapper;
    private final String DEFAULT_URL = "/balancegames";

    public BalanceGameController(BalanceGameService balanceGameService, BalanceGameMapper balanceGameMapper, BalanceGameCommentMapper balanceGameCommentMapper) {
        this.balanceGameService = balanceGameService;
        this.balanceGameMapper = balanceGameMapper;
        this.balanceGameCommentMapper = balanceGameCommentMapper;
    }

    @PostMapping
    public ResponseEntity postGame(@Valid @RequestBody BalanceGameDto.Post postDto,
                                   Authentication authentication){
        Principal principal = (Principal) authentication.getPrincipal();

        BalanceGame balanceGame = balanceGameService.createGame(balanceGameMapper.postDtoToGame(postDto), authentication);

        URI location = UriCreator.createUri(DEFAULT_URL, balanceGame.getBalanceGameId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{game-id}")
    public ResponseEntity getGame(@PathVariable("game-id") @Positive long gameId,
                                  Authentication authentication){
        Principal principal = (Principal) authentication.getPrincipal();

        BalanceGame game = balanceGameService.findGame(gameId);

        // 투표 목록을 좌우로 분리
        List<BalanceGameResult> leftResults = game.getResults().stream()
                .filter(vote -> vote.getSelectedOption().toString().equals("L"))
                .collect(Collectors.toList());
        List<BalanceGameResult> rightResults = game.getResults().stream()
                .filter(vote -> vote.getSelectedOption().toString().equals("R"))
                .collect(Collectors.toList());

        Map<String, Integer> leftCountMap = new HashMap<>();
        Map<String, Integer> rightCountMap = new HashMap<>();

        // 각 항목에서 MBTI별 득표수 구하기
        for (BalanceGameResult vote : leftResults){
            List<TestResult> mbtiTests = vote.getMember().getTestResults();
            String mbti = mbtiTests.isEmpty() ? "NONE" : mbtiTests.get(mbtiTests.size() - 1).getMbti();

            if(leftCountMap.containsKey(mbti)){
                leftCountMap.put(mbti, leftCountMap.get(mbti) + 1);
            }else{
                leftCountMap.put(mbti, 1);
            }
        }

        for(BalanceGameResult vote : rightResults){
            List<TestResult> mbtiTests = vote.getMember().getTestResults();
            String mbti = mbtiTests.isEmpty() ? "NONE" : mbtiTests.get(mbtiTests.size() - 1).getMbti();

            if(rightCountMap.containsKey(mbti)){
                rightCountMap.put(mbti, rightCountMap.get(mbti) + 1);
            }else {
                rightCountMap.put(mbti, 1);
            }
        }
        // 각 항목을 가장 많이 고른 mbti 구하기
        String leftMostMbti = leftCountMap.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(entry -> entry.getKey())
                .orElse("NONE")
                ;
        String rightMostMbti = rightCountMap.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(entry -> entry.getKey())
                .orElse("NONE")
                ;
        // 게임 참여했는지 여부
        boolean voted = false;
        for(BalanceGameResult result : game.getResults()){
            if(principal.getMemberId() == result.getMember().getMemberId()){
                voted = true;
                break;
            }
        }
        return new ResponseEntity(balanceGameMapper.gameToGameResponseDto(game, leftResults.size(), rightResults.size(),leftMostMbti, rightMostMbti, voted, balanceGameCommentMapper), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getGames(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size){
        Page<BalanceGame> pageGames = balanceGameService.findGames(page-1, size);
        List<BalanceGame> games = pageGames.getContent();

        return new ResponseEntity(balanceGameMapper.gamesToResponseDtos(games), HttpStatus.OK);
    }

    @DeleteMapping("/{game-id}")
    public ResponseEntity deleteGame(@PathVariable("game-id") @Positive long gameId){
        balanceGameService.deleteGame(gameId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
