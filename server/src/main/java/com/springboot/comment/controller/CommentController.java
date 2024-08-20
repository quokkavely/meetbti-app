package com.springboot.comment.controller;

import com.springboot.auth.Principal;
import com.springboot.comment.dto.CommentDto;
import com.springboot.comment.entity.Comment;
import com.springboot.comment.mapper.CommentMapper;
import com.springboot.comment.service.CommentService;
import com.springboot.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    public CommentController(CommentService commentService, CommentMapper commentMapper) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @PostMapping("/posts/{post-id}/comments")
    public ResponseEntity createComment (@PathVariable("post-id") @Positive long postId,
                                         @Valid @RequestBody CommentDto.Create createDto,
                                         Authentication authentication) {
        createDto.setPostId(postId);

        Comment comment = commentService.createComment(commentMapper.commentCreateDtoToComment(createDto),authentication);

        return new ResponseEntity(HttpStatus.CREATED);
    }
    @PatchMapping("/comments/{comment-id}")
    public ResponseEntity updateComment (@PathVariable("comment-id") @Positive long commentId,
                                         @Valid @RequestBody CommentDto.Update updateDto,
                                         Authentication authentication) {
        updateDto.setCommentId(commentId);

        Comment comment = commentService.updateComment(commentMapper.commentUpdateDtoToComment(updateDto));

        return new ResponseEntity(new SingleResponseDto<>(commentMapper.commentToCommentResponseDto(comment)),HttpStatus.OK);
    }
    //    @GetMapping("/comments")
//    public ResponseEntity getComments (Authentication authentication) {
//        Principal principal = (Principal) authentication.getPrincipal();
//
//        List<Comment> comments = commentService.findComments(principal.getMemberId());
//
//        return new ResponseEntity(new SingleResponseDto<>(commentMapper.commentsToCommentResponseDtos(comments)),HttpStatus.OK);
//    }
    @DeleteMapping("comments/{comment-id}")
    public ResponseEntity deleteComment (@PathVariable("comment-id") @Positive long commentId) {
        commentService.deleteComment(commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
