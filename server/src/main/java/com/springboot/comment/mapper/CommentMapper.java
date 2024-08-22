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
    @Mapping(source = "post.title", target = "title")
    @Mapping(source = "post.postId", target = "postId")
    CommentDto.SimpleResponse commentToCommentSimpleResponseDto (Comment comment);
    List<CommentDto.SimpleResponse> commentsToCommentSimpleResponseDtos (List<Comment> comment);
    default CommentDto.DetailedResponse commentToCommentDetailedResponseDto (Comment comment) {
        CommentDto.DetailedResponse.DetailedResponseBuilder response = CommentDto.DetailedResponse.builder();
            response.commentId(comment.getCommentId());
            response.image(comment.getMember().getImage());
            response.nickName(comment.getMember().getNickname());
            response.mbti(comment.getMember().getTestResults().get(comment.getMember().getTestResults().size()-1).getMbti());
            response.content(comment.getContent());
            response.heartCount(comment.getHearts().size());
            response.createdAt(comment.getCreatedAt());
            return response.build();
    }
    List<CommentDto.DetailedResponse> commentsToCommentDetailedResponseDtos (List<Comment> comments);
}
