package com.springboot.balancegame.dto;

import com.springboot.balancegame_comment.dto.BalanceGameCommentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class BalanceGameDto {
    @Builder
    @Getter
    @Setter
    public static class Post {
        @NotBlank
        private String title;
        @NotBlank
        private String leftOption;
        @NotBlank
        private String rightOption;
        private String nickName;
    }
    @Builder
    @Getter
    @AllArgsConstructor
    public static class Response {
        private long gameId;
        private String title;
        private String leftOption;
        private String rightOption;
        private int lCount;
        private int rCount;
        private String leftMostMbti;
        private String rightMostMbti;
        private List<BalanceGameCommentDto.Response> comments;
        private int commentCount;
        private int heartCount;
        private String nickName;
        private boolean voted;
    }
}
