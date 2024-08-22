package com.springboot.heart.controller;

import com.springboot.auth.utils.Principal;
import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.comment.entity.Comment;
import com.springboot.heart.entity.Heart;

import com.springboot.heart.mapper.HeartMapper;
import com.springboot.heart.service.HeartService;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import com.springboot.post.entity.Post;
import com.springboot.response.MultiResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping
@Validated
public class HeartController {
    private final HeartService heartService;
    private final HeartMapper heartMapper;
    private final MemberService memberService;

    public HeartController(HeartService service, HeartMapper heartMapper, MemberService memberService) {
        this.heartService = service;
        this.heartMapper = heartMapper;
        this.memberService = memberService;
    }

    @PostMapping("/posts/{postId}/hearts")
    public ResponseEntity togglePostLike(@PathVariable Long postId, Authentication authentication) {
        heartService.toggleHeart(authentication, postId, Heart.ContentType.POST);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/comments/{commentId}/hearts")
    public ResponseEntity toggleCommentLike(@PathVariable Long commentId, Authentication authentication) {
        heartService.toggleHeart(authentication, commentId, Heart.ContentType.COMMENT);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/balancegames/{balanceGameId}/hearts")
    public ResponseEntity toggleBalanceGameLike(@PathVariable Long balanceGameId, Authentication authentication) {
        heartService.toggleHeart(authentication, balanceGameId, Heart.ContentType.BALANCE_GAME);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/imagegames/{imageGameId}/hearts")
    public ResponseEntity toggleImageGameLike(@PathVariable Long imageGameId, Authentication authentication) {
        heartService.toggleHeart(authentication, imageGameId, Heart.ContentType.IMAGE_GAME);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/hearts")
    public ResponseEntity getHearts (@RequestParam int page,
                                     @RequestParam int size,
                                     @RequestParam String type,
                                     Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Member findMember = memberService.findMember(principal.getMemberId());

        Page<Object> pageContent = heartService.getLikedContentByMember(findMember, page - 1, size, type);

        List<?> responseDtos = pageContent.getContent().stream()
                .map(content -> {
                    switch (type.toLowerCase()) {
                        case "post":
                            return heartMapper.postToPostHeartResponseDto((Post) content);
                        case "comment":
                            return heartMapper.commentToCommentHeartResponseDto((Comment) content);
                        case "imagegame":
                            return heartMapper.imageGameToImageGameHeartResponseDto((ImageGame) content);
                        case "balancegame":
                            return heartMapper.BalanceGameToBalanceGameHeartResponseDto((BalanceGame) content);
                        default:
                            throw new IllegalArgumentException("Invalid type");
                    }
                })
                .collect(Collectors.toList());

        return new ResponseEntity(new MultiResponseDto<>(responseDtos, pageContent), HttpStatus.OK);
    }
}
