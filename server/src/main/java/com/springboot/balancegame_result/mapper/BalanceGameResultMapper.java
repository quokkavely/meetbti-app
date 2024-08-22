package com.springboot.balancegame_result.mapper;

import com.springboot.balancegame_result.dto.BalanceGameResultDto;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface BalanceGameResultMapper {
    @Mapping(source = "gameId", target = "balanceGame.balanceGameId")
    BalanceGameResult postDtoToResult(BalanceGameResultDto.Post postDto);
    default BalanceGameResultDto.Response resultToResponseDto(BalanceGameResult result) {
        BalanceGameResultDto.Response.ResponseBuilder response = BalanceGameResultDto.Response.builder();
            response.gameId(result.getBalanceGame().getBalanceGameId());
            response.title(result.getBalanceGame().getTitle());
            response.leftOption(result.getBalanceGame().getLeftOption());
            response.rightOption(result.getBalanceGame().getRightOption());
            response.commentCount(result.getBalanceGame().getComments().size());
            response.heartCount(result.getBalanceGame().getHearts().size());
            response.voted(true);

            return response.build();
    }
    default List<BalanceGameResultDto.Response> resultsToResponseDtos(List<BalanceGameResult> results) {
        return results.stream()
                .map(result -> resultToResponseDto(result))
                .collect(Collectors.toList());
    }
}
