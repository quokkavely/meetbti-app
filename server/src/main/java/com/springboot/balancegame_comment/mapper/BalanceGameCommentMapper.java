package com.springboot.balancegame_comment.mapper;

import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame_comment.dto.BalanceGameCommentDto;
import com.springboot.balancegame_comment.entity.BalanceGameComment;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BalanceGameCommentMapper {
    default BalanceGameComment postDtoToComment(BalanceGameCommentDto.Post postDto){
        BalanceGame game = new BalanceGame();
        game.setGameId(postDto.getGameId());

        Member member = new Member();
        member.setMemberId(postDto.getMemberId());

        return new BalanceGameComment(
                game, member, postDto.getContent()
        );
    };
    BalanceGameComment patchDtoToComment(BalanceGameCommentDto.Patch patchDto);
    default BalanceGameCommentDto.Response commentToResponseDto(BalanceGameComment comment){
        return new BalanceGameCommentDto.Response(
                comment.getGame().getGameId(),
                comment.getMember().getMemberId(),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getModifiedAt()
        );
    }
    List<BalanceGameCommentDto.Response> commentsToResponseDtos(List<BalanceGameComment> comments);
}
