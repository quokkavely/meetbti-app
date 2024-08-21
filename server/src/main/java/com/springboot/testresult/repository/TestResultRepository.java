package com.springboot.testresult.repository;

import com.springboot.member.entity.Member;
import com.springboot.testresult.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestResultRepository extends JpaRepository<TestResult,Long> {
    List<TestResult> findByMember(Member member);
}
