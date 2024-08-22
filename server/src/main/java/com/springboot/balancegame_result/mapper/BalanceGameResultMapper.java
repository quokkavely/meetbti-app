package com.springboot.balancegame_result.mapper;

import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame_result.dto.BalanceGameResultDto;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BalanceGameResultMapper {
    @Mapping(source = "gameId", target = "balanceGame.balanceGameId")
    BalanceGameResult postDtoToResult(BalanceGameResultDto.Post postDto);
    BalanceGameResultDto.Response resultToResponseDto(BalanceGameResult result);
    List<BalanceGameResultDto.Response> resultsToResponseDtos(List<BalanceGameResult> results);
}
