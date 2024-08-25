package com.springboot.comment.controller;

import com.springboot.comment.dto.CommentDto;
import com.springboot.comment.entity.Comment;
import com.springboot.comment.mapper.CommentMapper;
import com.springboot.comment.service.CommentService;
import com.springboot.response.MultiResponseDto;
import com.springboot.response.SingleResponseDto;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping
@Validated
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;
    private final static String COMMENT_DEFAULT_URL = "/comments";

    public CommentController(CommentService commentService, CommentMapper commentMapper) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @PostMapping("/posts/{post-id}/comments")
    public ResponseEntity createComment(@PathVariable("post-id") @Positive long postId,
                                        @Valid @RequestBody CommentDto.Create createDto,
                                        Authentication authentication) {
        createDto.setPostId(postId);

        Comment comment = commentService.createComment(commentMapper.commentCreateDtoToComment(createDto), authentication);

        URI location = UriCreator.createUri(COMMENT_DEFAULT_URL, comment.getCommentId());

        return  ResponseEntity.created(location).build();
    }
    @PatchMapping("/comments/{comment-id}")
    public ResponseEntity updateComment (@PathVariable("comment-id") @Positive long commentId,
                                         @Valid @RequestBody CommentDto.Update updateDto,
                                         Authentication authentication) {
        updateDto.setCommentId(commentId);

        Comment comment = commentService.updateComment(commentMapper.commentUpdateDtoToComment(updateDto), authentication);

        return new ResponseEntity(new SingleResponseDto<>(commentMapper.commentToCommentSimpleResponseDto(comment)),HttpStatus.OK);
    }
    @GetMapping("/comments")
    public ResponseEntity getComments(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size,
                                      @Positive @RequestParam(name = "member-id") Long memberId,
                                      Authentication authentication) {
        if (memberId == null)  throw new IllegalArgumentException("Member ID is required");

        Page<Comment> pageComments = commentService.findComments(page - 1, size, memberId, authentication);

        List<Comment> comments = pageComments.getContent();

        return new ResponseEntity(new MultiResponseDto<>(commentMapper.commentsToCommentSimpleResponseDtos(comments), pageComments),HttpStatus.OK);
    }
    @DeleteMapping("comments/{comment-id}")
    public ResponseEntity deleteComment (@PathVariable("comment-id") @Positive long commentId,
                                         Authentication authentication) {
        commentService.deleteComment(commentId, authentication);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
