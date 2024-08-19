package com.springboot.imagegame_comment.controller;

import com.springboot.imagegame_comment.dto.ImageGameCommentDto;
import com.springboot.imagegame_comment.entity.ImageGameComment;
import com.springboot.imagegame_comment.mapper.ImageGameCommentMapper;
import com.springboot.imagegame_comment.service.ImageGameCommentService;
import com.springboot.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "imagegame-comments")
public class ImageGameCommentController {
    private final String DEFAULT_URL = "/imagegames-comments";
    private final ImageGameCommentService service;
    private final ImageGameCommentMapper mapper;

    public ImageGameCommentController(ImageGameCommentService service, ImageGameCommentMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody ImageGameCommentDto.Post postDto){
        ImageGameComment tempComment = mapper.postDtoToComment(postDto);
        ImageGameComment comment = service.createComment(tempComment);

        URI location = UriCreator.createUri(DEFAULT_URL, comment.getCommentId());
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId){
        ImageGameComment comment = service.findComment(commentId);
        return new ResponseEntity(mapper.commentToResponseDto(comment), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getComments(){
        List<ImageGameComment> comments = service.findComments();
        return new ResponseEntity(mapper.commentsToResponseDtos(comments), HttpStatus.OK);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody ImageGameCommentDto.Patch patchDto){
        patchDto.setCommentId(commentId);
        ImageGameComment comment = service.updateComment(mapper.patchDtoToComment(patchDto));
        return new ResponseEntity(mapper.commentToResponseDto(comment), HttpStatus.OK);
    }
}
