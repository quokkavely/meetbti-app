package com.springboot.balancegame.mapper;

import com.springboot.auth.utils.Principal;
import com.springboot.balancegame.dto.BalanceGameDto;
import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame_comment.mapper.BalanceGameCommentMapper;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.testresult.entity.TestResult;
import org.mapstruct.Mapper;
import org.springframework.security.core.Authentication;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = BalanceGameCommentMapper.class)
public interface BalanceGameMapper {
    default BalanceGame postDtoToGame(BalanceGameDto.Post postDto) {
        return new BalanceGame(
                postDto.getTitle(),
                postDto.getLeftOption(),
                postDto.getRightOption(),
                postDto.getNickName());
    };
    default BalanceGameDto.Response gameToGameResponseDto(BalanceGame game, Authentication authentication, BalanceGameCommentMapper commentMapper) {
        Principal principal = (Principal) authentication.getPrincipal();

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

        return new BalanceGameDto.Response(
                game.getBalanceGameId(),
                game.getTitle(),
                game.getLeftOption(),
                game.getRightOption(),
                leftResults.size(),
                rightResults.size(),
                leftMostMbti,
                rightMostMbti,
                commentMapper.commentsToResponseDtos(game.getComments()),
                game.getComments().size(),
                game.getHearts().size(),
                game.getNickname(),
                voted
        );
    };
    default List<BalanceGameDto.Response> gamesToResponseDtos(List<BalanceGame> games, Authentication authentication, BalanceGameCommentMapper commentMapper) {
        return games.stream()
                .map(post -> gameToGameResponseDto(post, authentication, commentMapper))
                .collect(Collectors.toList());
    }
}
