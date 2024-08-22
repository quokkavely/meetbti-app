package com.springboot.imagegame.mapper;

import com.springboot.auth.utils.Principal;
import com.springboot.balancegame.dto.BalanceGameDto;
import com.springboot.imagegame.dto.ImageGameDto;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.imagegame_comment.dto.ImageGameCommentDto;
import com.springboot.imagegame_comment.mapper.ImageGameCommentMapper;
import com.springboot.imagegame_result.entity.ImageGameResult;
import com.springboot.testresult.entity.TestResult;
import org.mapstruct.Mapper;
import org.springframework.security.core.Authentication;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = ImageGameCommentMapper.class)
public interface ImageGameMapper {
    ImageGame imageGamePostDtoToImageGame (ImageGameDto.Post postDto);
    default ImageGameDto.Response gameToGameResponseDto (ImageGame game, Authentication authentication, ImageGameCommentMapper imageGameCommentMapper) {
        Principal principal = (Principal) authentication.getPrincipal();
        // mbti별 득표수를 저장하는 맵
        Map<String, Integer> mbtis = new HashMap<>();

        for(ImageGameResult result : game.getResults()){
            List<TestResult> mbtiTests = result.getMember().getTestResults();
            String mbti = mbtiTests.get(mbtiTests.size() - 1).getMbti();
            if(mbtis.containsKey(mbti)){
                mbtis.put(mbti, mbtis.get(mbti) + 1);
            }else {
                mbtis.put(mbti, 1);
            }
        }
        // 게임 참여했는지 여부
        boolean voted = false;

        for(ImageGameResult result : game.getResults()) {
            if(principal.getMemberId() == result.getMember().getMemberId()){
                voted = true;
                break;
            }
        }

        return new ImageGameDto.Response(
                game.getTopic(),
                game.getNickName(),
                game.getResults().size(),
                mbtis,
                game.getHearts().size(),
                imageGameCommentMapper.commentsToResponseDtos(game.getComments()),
                voted
        );
    };
    default List<ImageGameDto.Response> gamesToGameResponseDtos (List<ImageGame> games, Authentication authentication, ImageGameCommentMapper imageGameCommentMapper) {
        return games.stream()
                .map(post -> gameToGameResponseDto(post, authentication, imageGameCommentMapper))
                .collect(Collectors.toList());
    }
}
