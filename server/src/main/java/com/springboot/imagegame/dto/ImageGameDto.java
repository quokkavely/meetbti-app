package com.springboot.imagegame.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class ImageGameDto {
    @Getter
    public static class Post{
        private String topic;
        private String nickName;
    }

    @AllArgsConstructor
    @Getter
    public static class Response{
        private long gameId;
        private String topic;
        private List<ImageGameComment> comments;
        private int heartCount;
        private String nickName;
        private String gameStatus;
    }
}
