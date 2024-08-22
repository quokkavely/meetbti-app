package com.springboot.heart.controller;

import com.springboot.heart.entity.Heart;

import com.springboot.heart.service.HeartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@Validated
public class HeartController {
    private final HeartService heartService;

    public HeartController(HeartService service) {
        this.heartService = service;
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

//    @GetMapping("members/me/hearts")
//    public ResponseEntity getHears(Authentication authentication) {
//        List<Heart> hearts = heartService.getLikesByMember(authentication);
//        return ResponseEntity.ok(hearts);
//    }
    /*@GetMapping("/hearts")
    public ResponseEntity getHearts(@RequestParam int page,
                                    @RequestParam int size,
                                    @RequestParam long memberId,
                                    @RequestParam String type,
                                    Authentication authentication) {
    }*/
}
