package com.springboot.question.service;

import com.springboot.question.entity.Question;
import com.springboot.question.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }
    public List<Question> findAllQuestions() {
        return questionRepository.findAll();
    }
}
