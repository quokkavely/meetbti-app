package com.springboot.question.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class QuestionDto {
    @Builder
    @Getter
    public static class Response {
        private long questionId;
        private String content;
        private String tendency;
        private List<AnswerDto.Response> answers;
    }
}
