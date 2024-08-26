package com.springboot.testresult.controller;

import com.springboot.auth.utils.Principal;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import com.springboot.response.MultiResponseDto;
import com.springboot.response.SingleResponseDto;
import com.springboot.testresult.dto.TestResultDto;
import com.springboot.testresult.entity.TestResult;
import com.springboot.testresult.mapper.TestResultMapper;
import com.springboot.testresult.service.TestResultService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/mbti-test")
@Validated
public class TestResultController {
    private final TestResultService testResultService;
    private final TestResultMapper testResultMapper;
    private final MemberService memberService;

    public TestResultController(TestResultService testResultService, TestResultMapper testResultMapper, MemberService memberService) {
        this.testResultService = testResultService;
        this.testResultMapper = testResultMapper;
        this.memberService = memberService;
    }
    @PostMapping
    public ResponseEntity createTestResult(@Valid @RequestBody TestResultDto.Create createDto,
                                           Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        createDto.setMemberId(principal.getMemberId());

        TestResult testResult = testResultService.createTestResult(createDto,authentication);

        return new ResponseEntity<>(new SingleResponseDto<>(testResultMapper.testResultToTestResultResponseDto(testResult)), HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity getTestResults(@Positive @RequestParam int page,
                                         @Positive @RequestParam int size,
                                         /*@Positive @RequestParam(name = "member-id") Long memberId,*/
                                         Authentication authentication) {
        /*if (memberId == null) throw new IllegalArgumentException("Member ID is required");*/
        Principal principal = (Principal) authentication.getPrincipal();

        Page<TestResult> pageTestResult = testResultService.findTestResults(page - 1, size, authentication);

        List<TestResult> testResults = pageTestResult.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(testResultMapper.testResultsToTestResultResponseDtos(testResults), pageTestResult), HttpStatus.OK);
    }

//    @GetMapping("/me")
//    public ResponseEntity getLatestTestResult(Authentication authentication) {
//
//        Principal principal = (Principal) authentication.getPrincipal();
//        Member member = memberService.findMember(principal.getMemberId());
//
//
//        return new ResponseEntity<>(new SingleResponseDto<>(member.getTestResults().get(member.getTestResults().size() -1)), HttpStatus.OK);
//    }

}
