package com.springboot.question.repository;

import com.springboot.question.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer,Long> {
    @Query("SELECT a FROM Answer a WHERE a.answerId IN :answerIds")
    List<Answer> findAllByAnswerId(@Param("answerIds") List<Long> answerIds);
}
