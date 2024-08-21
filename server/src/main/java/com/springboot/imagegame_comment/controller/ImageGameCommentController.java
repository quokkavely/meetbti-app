package com.springboot.imagegame_comment.controller;

import com.springboot.imagegame.entity.ImageGame;
import com.springboot.imagegame_comment.dto.ImageGameCommentDto;
import com.springboot.imagegame_comment.entity.ImageGameComment;
import com.springboot.imagegame_comment.mapper.ImageGameCommentMapper;
import com.springboot.imagegame_comment.service.ImageGameCommentService;
import com.springboot.response.SingleResponseDto;
import com.springboot.utils.UriCreator;
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

    @PostMapping("/{imagegame-id}/imagegame-comments")
    public ResponseEntity postComment(@PathVariable("imagegame-id") @Positive long gameId,
                                      @Valid @RequestBody ImageGameCommentDto.Post postDto,
                                      Authentication authentication){
        postDto.setGameId(gameId);

        ImageGameComment imageGameComment = imageGameCommentService.createComment(gameId, imageGameCommentMapper.postDtoToComment(postDto), authentication);

        URI location = UriCreator.createUri(DEFAULT_URL, imageGameComment.getCommentId());

        return ResponseEntity.created(location).build();
    }
    @PatchMapping("imagegame-comments/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody ImageGameCommentDto.Patch patchDto,
                                       Authentication authentication){
        patchDto.setCommentId(commentId);

        ImageGameComment imageGameComment = imageGameCommentService.updateComment(imageGameCommentMapper.patchDtoToComment(patchDto), authentication);

        return new ResponseEntity(new SingleResponseDto<>(imageGameCommentMapper.commentToResponseDto(imageGameComment)), HttpStatus.OK);
    }
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId){
        ImageGameComment comment = imageGameCommentService.findComment(commentId);
        return new ResponseEntity(imageGameCommentMapper.commentToResponseDto(comment), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getComments(){
        List<ImageGameComment> comments = imageGameCommentService.findComments();
        return new ResponseEntity(imageGameCommentMapper.commentsToResponseDtos(comments), HttpStatus.OK);
    }
}
