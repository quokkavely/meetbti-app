package com.springboot.post.dto;

import com.springboot.comment.dto.CommentDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

public class PostDto {
    @Builder
    @Getter
    @Setter
    public static class Create {
        @NotNull
        private String title;
        @NotNull
        private String content;
        private String category;
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
    public static class PatchResponse {
        private String title;
        private String content;
    }
    @Builder
    @Getter
    public static class GetResponse {
        private long postId;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String image;
        private String nickName;
        private String mbti;
        private int heartCount;
        private int viewCount;
        private int commentCount;
        private List<CommentDto.Response> comments;
    }
}
