package com.springboot.balancegame_result.dto;

import com.springboot.balancegame_result.entity.BalanceGameResult;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class BalanceGameResultDto {
    @Getter
    public static class Post{
        private long gameId;
        private BalanceGameResult.SelectedOption selectedOption;
    }

    @AllArgsConstructor
    @Getter
    public static class Response{
        private long memberId;
        private long gameId;
        private String selectedOption;
    }
}
