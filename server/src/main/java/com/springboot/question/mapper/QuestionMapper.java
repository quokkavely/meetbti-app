package com.springboot.question.mapper;

import com.springboot.question.dto.QuestionDto;
import com.springboot.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
@Mapper(componentModel = "spring", uses = AnswerMapper.class)
public interface QuestionMapper {
    @Mapping(source = "answers", target = "answers")
    QuestionDto.Response questionToQuestionResponseDto(Question question);
    List<QuestionDto.Response> questionsToQuestionResponseDtos(List<Question> questions);
}
