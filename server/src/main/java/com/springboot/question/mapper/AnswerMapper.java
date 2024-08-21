package com.springboot.question.mapper;

import com.springboot.question.dto.AnswerDto;
import com.springboot.question.entity.Answer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    AnswerDto.Response answerToAnswerResponseDto(Answer answer);
    List<AnswerDto.Response> answersToAnswerResponseDtos(List<Answer> answers);

}
