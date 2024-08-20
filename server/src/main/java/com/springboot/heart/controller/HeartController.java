package com.springboot.heart.controller;

import com.springboot.heart.dto.HeartDto;
import com.springboot.heart.service.HeartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hearts")
public class HeartController {
    private final HeartService service;

    public HeartController(HeartService service) {
        this.service = service;
    }

    @PostMapping("/toggle")
    public ResponseEntity toggleHeart(Authentication authentication,
                                         @RequestBody HeartDto heartDto) {

        service.toggleHeart(authentication, heartDto.getType(), heartDto.getTargetId());
        return ResponseEntity.ok("Heart toggled");
    }

    @GetMapping("/my-page")
    public ResponseEntity getMyHearts(Authentication authentication) {

        return ResponseEntity.ok(service.getHeartsByMember(authentication));
    }
}
