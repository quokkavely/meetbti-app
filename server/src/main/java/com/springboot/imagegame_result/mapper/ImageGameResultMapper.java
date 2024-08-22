package com.springboot.imagegame_result.mapper;

import com.springboot.imagegame_result.dto.ImageGameResultDto;
import com.springboot.imagegame_result.entity.ImageGameResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImageGameResultMapper {
    @Mapping(source = "gameId", target = "imageGame.imageGameId")
    ImageGameResult postDtoToResult(ImageGameResultDto.Post postDto);
    default ImageGameResultDto.Response resultToResponseDto(ImageGameResult result) {
        ImageGameResultDto.Response.ResponseBuilder response = ImageGameResultDto.Response.builder();
            response.gameId(result.getImageGame().getImageGameId());
            response.topic(result.getImageGame().getTopic());
            response.commentCount(result.getImageGame().getComments().size());
            response.heartCount(result.getImageGame().getHearts().size());
            response.voted(true);

            return response.build();
    }
    default List<ImageGameResultDto.Response> resultsToResponseDtos(List<ImageGameResult> results) {
        return results.stream()
                .map(result -> resultToResponseDto(result))
                .collect(Collectors.toList());
    }
}
