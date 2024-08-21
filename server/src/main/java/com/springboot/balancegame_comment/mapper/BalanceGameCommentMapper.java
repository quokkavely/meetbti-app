package com.springboot.balancegame_comment.mapper;


import com.springboot.balancegame_comment.dto.BalanceGameCommentDto;
import com.springboot.balancegame_comment.entity.BalanceGameComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BalanceGameCommentMapper {
    @Mapping(source = "gameId", target = "balanceGame.balanceGameId")
    BalanceGameComment postDtoToComment (BalanceGameCommentDto.Post postDto);
    BalanceGameComment patchDtoToComment(BalanceGameCommentDto.Patch patchDto);
    default BalanceGameCommentDto.Response commentToResponseDto (BalanceGameComment balanceGameComment) {
        BalanceGameCommentDto.Response.ResponseBuilder response = BalanceGameCommentDto.Response.builder();
        response.image(balanceGameComment.getMember().getImage());
        response.nickName(balanceGameComment.getMember().getNickname());
        response.mbti(balanceGameComment.getMember().getTestResults().get(balanceGameComment.getMember().getTestResults().size()-1).getMbti());
        response.content(balanceGameComment.getContent());
        response.createdAt(balanceGameComment.getCreatedAt());
        response.modifiedAt(balanceGameComment.getModifiedAt());
        return response.build();
    }
    List<BalanceGameCommentDto.Response> commentsToResponseDtos(List<BalanceGameComment> comments);
}
