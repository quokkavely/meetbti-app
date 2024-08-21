package com.springboot.comment.mapper;

import com.springboot.comment.dto.CommentDto;
import com.springboot.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    @Mapping(source = "postId", target = "post.postId")
    Comment commentCreateDtoToComment (CommentDto.Create create);
    Comment commentUpdateDtoToComment (CommentDto.Update update);
    default CommentDto.Response commentToCommentResponseDto (Comment comment) {
        CommentDto.Response.ResponseBuilder response = CommentDto.Response.builder();
            response.commentId(comment.getCommentId());
            response.image(comment.getMember().getImage());
            response.nickName(comment.getMember().getNickname());
            response.mbti(comment.getMember().getTestResults().get(comment.getMember().getTestResults().size()-1).getMbti());
            response.content(comment.getContent());
            response.heartCount(comment.getHearts().size());
            response.createdAt(comment.getCreatedAt());
            return response.build();
    }
    List<CommentDto.Response> commentsToCommentResponseDtos (List<Comment> comments);
}
