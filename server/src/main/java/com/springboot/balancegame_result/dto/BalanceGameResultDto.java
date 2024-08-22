package com.springboot.balancegame_result.dto;

import com.springboot.balancegame_result.entity.BalanceGameResult;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

public class BalanceGameResultDto {
    @Builder
    @Getter
    @Setter
    public static class Post {
        private long gameId;
        @NotNull
        private BalanceGameResult.SelectedOption selectedOption;
    }
    @Builder
    @Getter
    public static class Response {
        private long gameId;
        private String title;
        private String leftOption;
        private String rightOption;
        private int commentCount;
        private int heartCount;
        private boolean voted;
    }
}
