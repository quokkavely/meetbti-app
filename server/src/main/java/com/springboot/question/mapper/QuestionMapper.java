package com.springboot.question.mapper;

import com.springboot.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
@Mapper(componentModel = "spring")
public interface QuestionMapper {

    Question questionToQuestionResponseDto(Question question);
    List<Question> questionsToQuestionResponseDtos(List<Question> questions);
}
