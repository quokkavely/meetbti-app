package com.springboot.comment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class CommentDto {
    @Builder
    @Getter
    @Setter
    public static class Create {
        private long postId;
        @NotNull
        private String content;
    }
    @Builder
    @Getter
    @Setter
    public static class Update {
        private long commentId;
        private String content;
    }
    @Builder
    @Getter
    public static class Response {
        private long commentId;
        private String image;
        private String nickName;
        private String mbti;
        private String content;
        private int heartCount;
        private LocalDateTime createdAt;
    }
}
