package com.springboot.imagegame_result.dto;

import com.springboot.imagegame_result.entity.ImageGameResult;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

public class ImageGameResultDto {
    @Builder
    @Getter
    @Setter
    public static class Post {
        private long gameId;
        @NotNull
        private ImageGameResult.SelectedMbti selectedMbti;
    }
    @Builder
    @Getter
    public static class Response {
        private long memberId;
        private long gameId;
        private String selectedMbti;
    }
}
