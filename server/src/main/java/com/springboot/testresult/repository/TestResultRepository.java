package com.springboot.testresult.repository;

import com.springboot.member.entity.Member;
import com.springboot.testresult.entity.TestResult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestResultRepository extends JpaRepository<TestResult,Long> {
    Page<TestResult> findByMember(Pageable pageable, Member member);
}
