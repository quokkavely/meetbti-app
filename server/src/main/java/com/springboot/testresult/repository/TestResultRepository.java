package com.springboot.testresult.repository;

import com.springboot.testresult.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestResultRepository extends JpaRepository<TestResult,Long> {
}