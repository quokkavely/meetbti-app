package com.springboot.imagegame.mapper;

import com.springboot.imagegame.dto.ImageGameDto;
import com.springboot.imagegame.entity.ImageGame;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImageGameMapper {
    default ImageGame postDtoToGame(ImageGameDto.Post postDto){
        return new ImageGame(
                postDto.getTopic(),
                postDto.getNickName()
        );
    }
    default ImageGameDto.Response gameToResponseDto(ImageGame game){
        return new ImageGameDto.Response(
                game.getGameId(),
                game.getTopic(),
                game.getComments(),
                game.getHearts().size(),
                game.getNickName(),
                game.getGameStatus().toString()
        );
    }
    List<ImageGameDto.Response> gamesToResponseDtos(List<ImageGame> games);
}
