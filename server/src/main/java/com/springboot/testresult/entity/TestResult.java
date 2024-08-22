package com.springboot.testresult.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;
}
