package com.springboot.imagegame.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class ImageGameDto {
    @Builder
    @Getter
    @Setter
    public static class Post{
        private String topic;
        private String nickName;
    }
    @Builder
    @Getter
    public static class Response{
        private String topic;
        private String nickName;
    }
}
