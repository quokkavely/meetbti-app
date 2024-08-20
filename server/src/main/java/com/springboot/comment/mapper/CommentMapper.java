package com.springboot.comment.mapper;

import com.springboot.comment.dto.CommentDto;
import com.springboot.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentCreateDtoToComment (CommentDto.Create create);
    Comment commentUpdateDtoToComment (CommentDto.Update update);
    CommentDto.Response commentToCommentResponseDto (Comment comment);
    List<CommentDto.Response> commentsToCommentResponseDtos (List<Comment> comments);
}
