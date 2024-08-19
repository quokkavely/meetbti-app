package com.springboot.balancegame_comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class BalanceGameCommentDto {
    @AllArgsConstructor
    @Getter
    public static class Post{
        private long gameId;
        private long memberId;
        private String content;
    }
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Patch{
        private long commentId;
        private String content;
    }

    @AllArgsConstructor
    @Getter
    public static class Response{
        private long gameId;
        private long memberId;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
