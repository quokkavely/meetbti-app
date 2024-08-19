package com.springboot.balancegame.mapper;

import com.springboot.balancegame.dto.BalanceGameDto;
import com.springboot.balancegame.entity.BalanceGame;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BalanceGameMapper {
    default BalanceGame postDtoToGame(BalanceGameDto.Post requestBody){
        return new BalanceGame(
                requestBody.getTitle(),
                requestBody.getLeftOption(),
                requestBody.getRightOption(),
                requestBody.getNickName());
    };
    default BalanceGameDto.Response gameToGameResponseDto(BalanceGame game){
        return new BalanceGameDto.Response(
                game.getGameId(),
                game.getTitle(),
                game.getLeftOption(),
                game.getRightOption(),
                0,
                0,
                game.getComments(),
                0,
                game.getNickname(),
                game.getGameStatus().toString()
        );
    }
    List<BalanceGameDto.Response> gamesToResponseDtos(List<BalanceGame> games);
}