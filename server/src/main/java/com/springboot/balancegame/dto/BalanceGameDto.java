package com.springboot.balancegame.dto;

import com.springboot.balancegame_comment.entity.BalanceGameComment;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class BalanceGameDto {
    @Getter
    public static class Post{
        @NotBlank
        private String title;

        @NotBlank
        private String leftOption;

        @NotBlank
        private String rightOption;

        @NotBlank
        private String nickName;
    }
    @AllArgsConstructor
    @Getter
    public static class Response{
        private long gameId;
        private String title;
        private String leftOption;
        private String rightOption;
        private int lCount;
        private int rCount;
        private List<BalanceGameComment> comments;
        private int heartCount;
        private String nickName;
        private String gameStatus;
    }
}
