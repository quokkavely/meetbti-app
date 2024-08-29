package com.springboot.imagegame.mapper;

import com.springboot.auth.utils.Principal;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.imagegame.dto.ImageGameDto;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.imagegame_comment.mapper.ImageGameCommentMapper;
import com.springboot.imagegame_result.entity.ImageGameResult;
import com.springboot.testresult.entity.TestResult;
import org.mapstruct.Mapper;
import org.springframework.security.core.Authentication;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = ImageGameCommentMapper.class)
public interface ImageGameMapper {
    ImageGame imageGamePostDtoToImageGame(ImageGameDto.Post postDto);
    default ImageGameDto.Response gameToGameResponseDto(ImageGame game, Authentication authentication, ImageGameCommentMapper imageGameCommentMapper) {
        Principal principal = (Principal) authentication.getPrincipal();
        // mbti별 득표수를 저장하는 맵
        Map<String, Integer> mbtis = new LinkedHashMap<>();

        for(ImageGameResult result : game.getResults()){
            List<TestResult> mbtiTests = result.getMember().getTestResults();
            String mbti = mbtiTests.get(mbtiTests.size() - 1).getSecondMbti();
            if(mbtis.containsKey(mbti)){
                mbtis.put(mbti, mbtis.get(mbti) + 1);
            }else {
                mbtis.put(mbti, 1);
            }
        }
        // 상위 3개만 남김
        mbtis = mbtis.entrySet().stream()
                .sorted((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()))  // 값을 기준으로 내림차순 정렬
                .limit(3)  // 상위 3개의 항목으로 제한
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new  // 정렬된 순서를 유지하는 LinkedHashMap으로 수집
                ));
        // 게임 참여했는지 여부
        String selectedOption = "";
        for(ImageGameResult result : game.getResults()){
            if(principal.getMemberId() == result.getMember().getMemberId()){
                selectedOption = result.getSelectedMbti().toString();
                break;
            }
        }

        return new ImageGameDto.Response(
                game.getImageGameId(),
                game.getTopic(),
                game.getNickName(),
                game.getResults().size(),
                mbtis,
                game.getHearts().size(),
                imageGameCommentMapper.commentsToResponseDtos(game.getComments()),
                selectedOption

        );
    };
    default List<ImageGameDto.Response> gamesToGameResponseDtos(List<ImageGame> games, Authentication authentication, ImageGameCommentMapper imageGameCommentMapper) {
        return games.stream()
                .map(post -> gameToGameResponseDto(post, authentication, imageGameCommentMapper))
                .collect(Collectors.toList());
    }
}
