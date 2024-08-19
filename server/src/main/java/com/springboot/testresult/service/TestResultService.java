package com.springboot.testresult.service;

import com.springboot.question.entity.Answer;
import com.springboot.question.repository.AnswerRepository;
import com.springboot.testresult.dto.TestResultDto;
import com.springboot.testresult.entity.TestResult;
import com.springboot.testresult.repository.TestResultRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TestResultService {
    private final TestResultRepository testResultRepository;
    private final AnswerRepository answerRepository;

    public TestResultService(TestResultRepository testResultRepository, AnswerRepository answerRepository) {
        this.testResultRepository = testResultRepository;
        this.answerRepository = answerRepository;
    }
    public TestResult createTestResult (TestResultDto.Create createDto) {
        List<Answer> answers = answerRepository.findAllById(createDto.getAnswerIds());

        TestResult testResult = createMbti(answers);

        return testResultRepository.save(testResult);
    }
    private TestResult createMbti (List<Answer> answers) {
        TestResult testResult = new TestResult();

        Map<String, Integer> scores = new HashMap<>();

        scores.put("E", 0);
        scores.put("S", 0);
        scores.put("F", 0);
        scores.put("J", 0);

        for (Answer answer : answers) {
            String tendency = getTendencyFromQuestionId(answer.getQuestion().getQuestionId());
            int score = answer.getScore();
            scores.put(tendency, scores.get(tendency) + score);
        }
        int eScore = scores.get("E");
        int iScore = 400 - eScore;

        int sScore = scores.get("S");
        int nScore = 400 - sScore;

        int fScore = scores.get("F");
        int tScore = 400 - fScore;

        int jScore = scores.get("J");
        int pScore = 400 - jScore;

        StringBuilder mbti = new StringBuilder();
        mbti.append(eScore > iScore ? "E" : "I");
        mbti.append(sScore > nScore ? "S" : "N");
        mbti.append(fScore > tScore ? "F" : "T");
        mbti.append(jScore > pScore ? "J" : "P");

        int minDiff = Math.min(Math.min(eScore, sScore), Math.min(fScore, jScore));
        StringBuilder secondMbti = new StringBuilder(mbti.toString());

        if (minDiff == eScore) {
            secondMbti.setCharAt(0, mbti.charAt(0) == 'E' ? 'I' : 'E');
        } else if (minDiff == sScore) {
            secondMbti.setCharAt(1, mbti.charAt(1) == 'S' ? 'N' : 'S');
        } else if (minDiff == fScore) {
            secondMbti.setCharAt(2, mbti.charAt(2) == 'F' ? 'T' : 'F');
        } else if (minDiff == jScore) {
            secondMbti.setCharAt(3, mbti.charAt(3) == 'J' ? 'P' : 'J');
        }
        testResult.setMbti(mbti.toString());
        testResult.setSecondMbti(secondMbti.toString());
        testResult.setScoreEI(Math.max(eScore, iScore));
        testResult.setScoreSN(Math.max(sScore, nScore));
        testResult.setScoreFT(Math.max(fScore, tScore));
        testResult.setScoreJP(Math.max(jScore, pScore));

        return testResult;
    }
    private String getTendencyFromQuestionId(Long questionId) {
        if (questionId >= 1 && questionId <= 4) {
            return "E";
        } else if (questionId >= 5 && questionId <= 8) {
            return "S";
        } else if (questionId >= 9 && questionId <= 12) {
            return "F";
        } else {
            return "J";
        }
    }
}
