package com.springboot.balancegame_comment.controller;


import com.springboot.balancegame_comment.dto.BalanceGameCommentDto;
import com.springboot.balancegame_comment.entity.BalanceGameComment;
import com.springboot.balancegame_comment.mapper.BalanceGameCommentMapper;
import com.springboot.balancegame_comment.service.BalanceGameCommentService;
import com.springboot.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/balancegame-comments")
@Validated
public class BalanceGameCommentController {
    private final String DEFAULT_URL = "/balancegames-comments";
    private final BalanceGameCommentService service;
    private final BalanceGameCommentMapper mapper;

    public BalanceGameCommentController(BalanceGameCommentService service, BalanceGameCommentMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody BalanceGameCommentDto.Post postDto){
        BalanceGameComment tempComment = mapper.postDtoToComment(postDto);
        BalanceGameComment comment = service.createComment(tempComment);

        URI location = UriCreator.createUri(DEFAULT_URL, comment.getCommentId());
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId){
        BalanceGameComment comment = service.findComment(commentId);
        return new ResponseEntity(mapper.commentToResponseDto(comment), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getComments(){
        List<BalanceGameComment> comments = service.findComments();
        return new ResponseEntity(mapper.commentsToResponseDtos(comments), HttpStatus.OK);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody BalanceGameCommentDto.Patch patchDto){
        patchDto.setCommentId(commentId);
        BalanceGameComment comment = service.updateComment(mapper.patchDtoToComment(patchDto));
        return new ResponseEntity(mapper.commentToResponseDto(comment), HttpStatus.OK);
    }
}
