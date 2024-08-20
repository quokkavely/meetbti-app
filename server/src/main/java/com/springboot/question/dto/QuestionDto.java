package com.springboot.question.dto;

import antlr.collections.impl.LList;
import com.springboot.question.entity.Answer;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class QuestionResponseDto {
    private String content;
    private String tendency;
    private List<Answer> answers;
}
