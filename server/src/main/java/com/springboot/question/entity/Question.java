package com.springboot.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Question {
    @Id
    @GeneratedValue
    private long questionId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String tendency;

    @OneToMany(mappedBy = "question")
    private List<Answer> answers = new ArrayList<>();
}