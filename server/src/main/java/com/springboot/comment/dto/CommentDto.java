package com.springboot.comment.dto;

import com.springboot.post.entity.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

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
        private long postId;
        private long commentId;
        private String content;
        private Post post;
    }
    @Builder
    @Getter
    public static class Response {
        private String content;
    }
}
