package com.springboot.testresult.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long testResultId;

    @Column(nullable = false, length = 4)
    private String mbti;

    @Column(nullable = false, length = 4)
    private String secondMbti;

    @Column(nullable = false)
    private int scoreEI;

    @Column(nullable = false)
    private int scoreSN;

    @Column(nullable = false)
    private int scoreFT;

    @Column(nullable = false)
    private int scoreJP;
}
