package com.springboot.post.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class PostDto {
    @Builder
    @Getter
    public static class Create {
        @NotNull
        private String title;
        @NotNull
        private String content;
    }
    @Builder
    @Getter
    @Setter
    public static class Update {
        private long postId;
        private String title;
        private String content;
    }
    @Builder
    @Getter
    public static class Response {
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private int viewCount;
    }
}
