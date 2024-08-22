package com.springboot.imagegame_comment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class ImageGameCommentDto {
    @Builder
    @Getter
    @Setter
    public static class Post {
        private long gameId;
        private String content;
    }
    @Builder
    @Getter
    @Setter
    public static class Patch {
        private long commentId;
        private String content;
    }
    @Builder
    @Getter
    public static class Response {
        private String image;
        private String nickName;
        private String mbti;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
