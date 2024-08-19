package com.springboot.imagegame_comment.mapper;

import com.springboot.imagegame.entity.ImageGame;
import com.springboot.imagegame_comment.dto.ImageGameCommentDto;
import com.springboot.imagegame_comment.entity.ImageGameComment;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImageGameCommentMapper {
    default ImageGameComment postDtoToComment(ImageGameCommentDto.Post postDto){
        ImageGame game = new ImageGame();
        game.setGameId(postDto.getGameId());

        Member member = new Member();
        member.setMemberId(postDto.getMemberId());

        return new ImageGameComment(game,member,postDto.getContent());
    }
    ImageGameComment patchDtoToComment(ImageGameCommentDto.Patch patchDto);
    default ImageGameCommentDto.Response commentToResponseDto(ImageGameComment comment){
        return new ImageGameCommentDto.Response(
                comment.getGame().getGameId(),
                comment.getMember().getMemberId(),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getModifiedAt()
        );
    }
    List<ImageGameCommentDto.Response> commentsToResponseDtos(List<ImageGameComment> comments);
}
