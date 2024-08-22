package com.springboot.heart.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class HeartResponseDto {
    @Builder
    @Getter
    public static class PostHeartResponse {
        private String title;
        private LocalDateTime createdAt;
    }
    @Builder
    @Getter
    public static class CommentHeartResponse {
        private String content;
        private String title;
        private LocalDateTime createdAt;

    }
    @Builder
    @Getter
    public static class ImageGameHeartResponse {
        private String topic;
        private LocalDateTime createdAt;
    }
    @Builder
    @Getter
    public static class BalanceGameHeartResponse {
        private String title;
        private LocalDateTime createdAt;
    }

}
