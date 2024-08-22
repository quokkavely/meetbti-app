package com.springboot.balancegame_comment.controller;


import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame_comment.dto.BalanceGameCommentDto;
import com.springboot.balancegame_comment.entity.BalanceGameComment;
import com.springboot.balancegame_comment.mapper.BalanceGameCommentMapper;
import com.springboot.balancegame_comment.service.BalanceGameCommentService;
import com.springboot.comment.entity.Comment;
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
public class BalanceGameCommentController {
    private final BalanceGameCommentService balanceGameCommentService;
    private final BalanceGameCommentMapper balanceGameCommentMapper;
    private final String DEFAULT_URL = "/balancegame-comments";

    public BalanceGameCommentController(BalanceGameCommentService balanceGameCommentService, BalanceGameCommentMapper balanceGameCommentMapper) {
        this.balanceGameCommentService = balanceGameCommentService;
        this.balanceGameCommentMapper = balanceGameCommentMapper;
    }

    @PostMapping("/balancegames/{balancegame-id}/balancegame-comments")
    public ResponseEntity postComment(@PathVariable("balancegame-id") @Positive long gameId,
                                      @Valid @RequestBody BalanceGameCommentDto.Post postDto,
                                      Authentication authentication) {
        postDto.setGameId(gameId);

        BalanceGameComment balanceGameComment = balanceGameCommentService.createComment(balanceGameCommentMapper.postDtoToComment(postDto), authentication);

        URI location = UriCreator.createUri(DEFAULT_URL, balanceGameComment.getCommentId());

        return ResponseEntity.created(location).build();
    }
    @PatchMapping("/balancegame-comments/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody BalanceGameCommentDto.Patch patchDto,
                                       Authentication authentication) {
        patchDto.setCommentId(commentId);

        BalanceGameComment balanceGameComment = balanceGameCommentService.updateComment(balanceGameCommentMapper.patchDtoToComment(patchDto), authentication);

        return new ResponseEntity<>(new SingleResponseDto<>(balanceGameCommentMapper.commentToResponseDto(balanceGameComment)), HttpStatus.OK);
    }
//    @GetMapping
//    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId){
//        BalanceGameComment comment = balanceGameCommentService.findComment(commentId);
//        return new ResponseEntity(balanceGameCommentMapper.commentToResponseDto(comment), HttpStatus.OK);
//    }
    @GetMapping("/balancegame-comments")
    public ResponseEntity getComments(@Positive @RequestParam long memberId,
                                      @Positive @RequestParam int page,
                                      @Positive @RequestParam int size,
                                      Authentication authentication) {
        Page<BalanceGameComment> pageBalanceGameComment = balanceGameCommentService.findComments(memberId, page, size, authentication);

        List<BalanceGameComment> balanceGameComments = pageBalanceGameComment.getContent();


        return new ResponseEntity<>(balanceGameCommentMapper.commentsToResponseDtos(balanceGameComments), HttpStatus.OK);
    }
}
