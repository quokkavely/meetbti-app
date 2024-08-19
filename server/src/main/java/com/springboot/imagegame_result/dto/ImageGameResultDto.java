package com.springboot.imagegame_result.dto;

import com.springboot.imagegame_result.entity.ImageGameResult;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class ImageGameResultDto {
    @Getter
    public static class Post{
        private long memberId;
        private long gameId;
        private ImageGameResult.SelectedMbti selectedMbti;
    }

    @AllArgsConstructor
    @Getter
    public static class Response{
        private long memberId;
        private long gameId;
        private String selectedMbti;
    }
}
