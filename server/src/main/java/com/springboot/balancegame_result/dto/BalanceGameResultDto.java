package com.springboot.balancegame_result.dto;

import com.springboot.balancegame.dto.BalanceGameDto;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import lombok.AllArgsConstructor;
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
    public static class PostResponse{
        private BalanceGameDto.Response gameinfo;
    }
    @Builder
    @Getter
    public static class Response {
        private long memberId;
        private long gameId;
        private String selectedOption;
    }
}
