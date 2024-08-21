package com.springboot.testresult.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class TestResultDto {
    @Builder
    @Getter
    @Setter
    public static class Create {
        private long memberId;
        private List<Long> answerIds;
    }
    @Builder
    @Getter
    @Setter
    public static class Response {
        private String mbti;
        private String secondMbti;
        private int scoreEI;
        private int scoreSN;
        private int scoreFT;
        private int scoreJP;
        private LocalDateTime createdAt;
    }
}
