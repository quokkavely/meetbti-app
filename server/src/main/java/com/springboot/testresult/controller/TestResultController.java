package com.springboot.testresult.controller;

import com.springboot.auth.utils.Principal;
import com.springboot.response.SingleResponseDto;
import com.springboot.testresult.dto.TestResultDto;
import com.springboot.testresult.entity.TestResult;
import com.springboot.testresult.mapper.TestResultMapper;
import com.springboot.testresult.service.TestResultService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/mbti-test")
@Validated
public class TestResultController {
    private final TestResultService testResultService;
    private final TestResultMapper testResultMapper;

    public TestResultController(TestResultService testResultService, TestResultMapper testResultMapper) {
        this.testResultService = testResultService;
        this.testResultMapper = testResultMapper;
    }

    @PostMapping
    public ResponseEntity createTestResult (@Valid @RequestBody TestResultDto.Create createDto,
                                            Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        createDto.setMemberId(principal.getMemberId());

        TestResult testResult = testResultService.createTestResult(createDto,authentication);

        return new ResponseEntity(new SingleResponseDto<>(testResultMapper.testResultToTestResultResponseDto(testResult)), HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity getTestResults (Authentication authentication) {
        List<TestResult> testResults = testResultService.findTestResults(authentication);

        return new ResponseEntity(new SingleResponseDto<>(testResultMapper.testResultsToTestResultResponseDtos(testResults)), HttpStatus.OK);
    }
}
