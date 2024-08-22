package com.springboot.question.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int score;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    @JsonBackReference("question-answer")
    private Question question;
}
