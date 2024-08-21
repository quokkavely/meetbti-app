package com.springboot.imagegame.dto;

import com.springboot.imagegame_comment.dto.ImageGameCommentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

public class ImageGameDto {
    @Builder
    @Getter
    @Setter
    public static class Post{
        @NotNull
        private String topic;
        private String nickName;
    }
    @Builder
    @Getter
    @AllArgsConstructor
    public static class Response{
        private String topic;
        private String nickName;
        private int totalVotes;
        private Map<String, Integer> mbtis;
        private int heartCount;
        private List<ImageGameCommentDto.Response> comments;
        private boolean voted;
    }
}
