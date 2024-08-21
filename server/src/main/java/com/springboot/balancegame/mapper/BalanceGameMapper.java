package com.springboot.balancegame.mapper;

import com.springboot.balancegame.dto.BalanceGameDto;
import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame_comment.dto.BalanceGameCommentDto;
import com.springboot.balancegame_comment.mapper.BalanceGameCommentMapper;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.testresult.entity.TestResult;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = BalanceGameCommentMapper.class)
public interface BalanceGameMapper {
    default BalanceGame postDtoToGame(BalanceGameDto.Post postDto){
        return new BalanceGame(
                postDto.getTitle(),
                postDto.getLeftOption(),
                postDto.getRightOption(),
                postDto.getNickName());
    };
    default BalanceGameDto.Response gameToGameResponseDto (BalanceGame game, int leftCount, int rightCount,
                                                           String leftMostMbti, String rightMostMbti, boolean voted,BalanceGameCommentMapper commentMapper){


        return new BalanceGameDto.Response(
                game.getBalanceGameId(),
                game.getTitle(),
                game.getLeftOption(),
                game.getRightOption(),
                leftCount,
                rightCount,
                leftMostMbti,
                rightMostMbti,
                commentMapper.commentsToResponseDtos(game.getComments()),
                game.getHearts().size(),
                game.getNickname(),
                game.getGameStatus().toString(),
                voted
        );
    };
    List<BalanceGameDto.Response> gamesToResponseDtos(List<BalanceGame> games);
}
