package com.springboot.testresult.mapper;

import com.springboot.testresult.dto.TestResultDto;
import com.springboot.testresult.entity.TestResult;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TestResultMapper {
    TestResultDto.Response testResultToTestResultResponseDto (TestResult testResult);
}