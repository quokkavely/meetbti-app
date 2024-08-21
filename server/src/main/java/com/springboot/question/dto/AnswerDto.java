package com.springboot.question.dto;

import lombok.Builder;
import lombok.Getter;

public class AnswerDto {
    @Builder
    @Getter
    public static class Response {
        private String content;
        private int score;
    }
}
