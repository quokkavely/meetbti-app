package com.springboot.imagegame_comment.controller;

import com.springboot.imagegame_comment.dto.ImageGameCommentDto;
import com.springboot.imagegame_comment.entity.ImageGameComment;
import com.springboot.imagegame_comment.mapper.ImageGameCommentMapper;
import com.springboot.imagegame_comment.service.ImageGameCommentService;
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
public class ImageGameCommentController {
    private final ImageGameCommentService imageGameCommentService;
    private final ImageGameCommentMapper imageGameCommentMapper;
    private final static String DEFAULT_URL = "/imagegame-comments";

    public ImageGameCommentController(ImageGameCommentService service, ImageGameCommentMapper mapper) {
        this.imageGameCommentService = service;
        this.imageGameCommentMapper = mapper;
    }

    @PostMapping("/imagegames/{imagegame-id}/imagegame-comments")
    public ResponseEntity postComment(@PathVariable("imagegame-id") @Positive long gameId,
                                      @Valid @RequestBody ImageGameCommentDto.Post postDto,
                                      Authentication authentication) {
        postDto.setGameId(gameId);

        ImageGameComment imageGameComment = imageGameCommentService.createComment(imageGameCommentMapper.postDtoToComment(postDto), authentication);

        URI location = UriCreator.createUri(DEFAULT_URL, imageGameComment.getCommentId());

        return ResponseEntity.created(location).build();
    }
    @PatchMapping("/imagegame-comments/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody ImageGameCommentDto.Patch patchDto,
                                       Authentication authentication) {
        patchDto.setCommentId(commentId);

        ImageGameComment imageGameComment = imageGameCommentService.updateComment(imageGameCommentMapper.patchDtoToComment(patchDto), authentication);

        return new ResponseEntity<>(new SingleResponseDto<>(imageGameCommentMapper.commentToResponseDto(imageGameComment)), HttpStatus.OK);
    }
    @GetMapping("imagegame-comments")
    public ResponseEntity getComments(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size,
                                      @Positive @RequestParam(name = "member-id") Long memberId,
                                      Authentication authentication) {
        if (memberId == null)  throw new IllegalArgumentException("Member ID is required");

        Page<ImageGameComment> pageImageGameComment = imageGameCommentService.findComments(page - 1, size, memberId, authentication);

        List<ImageGameComment> imageGameComments = pageImageGameComment.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(imageGameCommentMapper.commentsToResponseDtos(imageGameComments), pageImageGameComment), HttpStatus.OK);
    }
}
