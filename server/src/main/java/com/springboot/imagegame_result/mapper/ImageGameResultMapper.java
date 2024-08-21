package com.springboot.imagegame_result.mapper;

import com.springboot.imagegame_result.dto.ImageGameResultDto;
import com.springboot.imagegame_result.entity.ImageGameResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImageGameResultMapper {
    @Mapping(source = "gameId", target = "imageGame.imageGameId")
    ImageGameResult postDtoToResult (ImageGameResultDto.Post postDto);
    ImageGameResultDto.Response resultToResponseDto(ImageGameResult result);
    List<ImageGameResultDto.Response> resultsToResponseDtos(List<ImageGameResult> results);
}
