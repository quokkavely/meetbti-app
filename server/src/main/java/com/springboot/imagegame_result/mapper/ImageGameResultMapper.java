package com.springboot.imagegame_result.mapper;

import com.springboot.imagegame.entity.ImageGame;
import com.springboot.imagegame_result.dto.ImageGameResultDto;
import com.springboot.imagegame_result.entity.ImageGameResult;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImageGameResultMapper {
    default ImageGameResult postDtoToResult(ImageGameResultDto.Post postDto){
        Member member = new Member();
        member.setMemberId(postDto.getMemberId());

        ImageGame game = new ImageGame();
        game.setGameId(postDto.getGameId());

        return new ImageGameResult(member, game, postDto.getSelectedMbti());
    }

    default ImageGameResultDto.Response resultToResponseDto(ImageGameResult result){
        return new ImageGameResultDto.Response(
                result.getMember().getMemberId(),
                result.getGame().getGameId(),
                result.getSelectedMbti().toString()
        );
    }
    List<ImageGameResultDto.Response> resultsToResponseDtos(List<ImageGameResult> results);
}
