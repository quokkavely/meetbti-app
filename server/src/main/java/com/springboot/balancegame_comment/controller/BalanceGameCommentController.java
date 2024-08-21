package com.springboot.balancegame_comment.controller;


import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame_comment.dto.BalanceGameCommentDto;
import com.springboot.balancegame_comment.entity.BalanceGameComment;
import com.springboot.balancegame_comment.mapper.BalanceGameCommentMapper;
import com.springboot.balancegame_comment.service.BalanceGameCommentService;
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
@RequestMapping("/balancegame-comments")
@Validated
public class BalanceGameCommentController {
    private final BalanceGameCommentService balanceGameCommentService;
    private final BalanceGameCommentMapper balanceGameCommentMapper;
    private final String DEFAULT_URL = "/balancegame-comments";

    public BalanceGameCommentController(BalanceGameCommentService service, BalanceGameCommentMapper mapper) {
        this.balanceGameCommentService = service;
        this.balanceGameCommentMapper = mapper;
    }

    @PostMapping
    public ResponseEntity postComment (/*@PathVariable("balancegame-id") @Positive long gameId,*/
                                       @Valid @RequestBody BalanceGameCommentDto.Post postDto,
                                       Authentication authentication) {
        /*postDto.setGameId(gameId);*/
        BalanceGameComment tempComment = balanceGameCommentMapper.postDtoToComment(postDto);
        BalanceGameComment balanceGameComment = balanceGameCommentService.createComment(tempComment, authentication);

        URI location = UriCreator.createUri(DEFAULT_URL, balanceGameComment.getCommentId());

        return ResponseEntity.created(location).build();
    }
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody BalanceGameCommentDto.Patch patchDto,
                                       Authentication authentication){
        patchDto.setCommentId(commentId);

        BalanceGameComment balanceGameComment = balanceGameCommentService.updateComment(balanceGameCommentMapper.patchDtoToComment(patchDto), authentication);

        return new ResponseEntity(new SingleResponseDto<>(balanceGameCommentMapper.commentToResponseDto(balanceGameComment)), HttpStatus.OK);
    }
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId){
        BalanceGameComment comment = balanceGameCommentService.findComment(commentId);
        return new ResponseEntity(balanceGameCommentMapper.commentToResponseDto(comment), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getComments(){
        List<BalanceGameComment> comments = balanceGameCommentService.findComments();
        return new ResponseEntity(balanceGameCommentMapper.commentsToResponseDtos(comments), HttpStatus.OK);
    }
}
