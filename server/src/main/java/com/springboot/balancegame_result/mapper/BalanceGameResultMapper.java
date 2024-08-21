package com.springboot.balancegame_result.mapper;

import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame_result.dto.BalanceGameResultDto;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BalanceGameResultMapper {
    /*BalanceGameResult postDtoToResult(BalanceGameResultDto.Post postDto);*/
    default BalanceGameResult postDtoToResult(BalanceGameResultDto.Post postDto){
        BalanceGame game = new BalanceGame();
        game.setBalanceGameId(postDto.getGameId());

        return new BalanceGameResult(game, postDto.getSelectedOption());
    }
    default BalanceGameResultDto.Response resultToResponseDto(BalanceGameResult result){
        return new BalanceGameResultDto.Response(
                result.getMember().getMemberId(),
                result.getBalanceGame().getBalanceGameId(),
                result.getSelectedOption().toString()
        );
    };
    List<BalanceGameResultDto.Response> resultsToResponseDtos(List<BalanceGameResult> results);
}
