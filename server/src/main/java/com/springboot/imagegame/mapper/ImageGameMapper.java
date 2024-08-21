package com.springboot.imagegame.mapper;

import com.springboot.imagegame.dto.ImageGameDto;
import com.springboot.imagegame.entity.ImageGame;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ImageGameMapper {
    ImageGame imageGamePostDtoToImageGame (ImageGameDto.Post postDto);
    ImageGameDto.Response imageGameToImageGameResponseDto (ImageGame imageGame);
    List<ImageGameDto.Response> imageGamesToImageGameResponseDtos(List<ImageGame> games);
}
