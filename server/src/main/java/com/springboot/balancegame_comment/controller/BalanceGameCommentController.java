package com.springboot.balancegame_comment.controller;

import com.springboot.balancegame_comment.dto.BalanceGameCommentDto;
import com.springboot.balancegame_comment.entity.BalanceGameComment;
import com.springboot.balancegame_comment.mapper.BalanceGameCommentMapper;
import com.springboot.balancegame_comment.service.BalanceGameCommentService;
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
public class BalanceGameCommentController {
    private final BalanceGameCommentService balanceGameCommentService;
    private final BalanceGameCommentMapper balanceGameCommentMapper;
    private final String DEFAULT_URL = "/balancegame-comments";

    public BalanceGameCommentController(BalanceGameCommentService balanceGameCommentService, BalanceGameCommentMapper balanceGameCommentMapper) {
        this.balanceGameCommentService = balanceGameCommentService;
        this.balanceGameCommentMapper = balanceGameCommentMapper;
    }

    @PostMapping("/balancegame/{balancegame-id}/balancegame-comments")
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
    @GetMapping("/balancegame-comments")
    public ResponseEntity getComments(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size,
                                      @Positive @RequestParam(name = "member-id") Long memberId,
                                      Authentication authentication) {
        if (memberId == null)  throw new IllegalArgumentException("Member ID is required");

        Page<BalanceGameComment> pageBalanceGameComment = balanceGameCommentService.findComments(page - 1, size, memberId, authentication);

        List<BalanceGameComment> balanceGameComments = pageBalanceGameComment.getContent();


        return new ResponseEntity<>(new MultiResponseDto<>(balanceGameCommentMapper.commentsToResponseDtos(balanceGameComments), pageBalanceGameComment), HttpStatus.OK);
    }
}
