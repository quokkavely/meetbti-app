package com.springboot.balancegame_result.repository;

import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BalanceGameResultRepository extends JpaRepository<BalanceGameResult, Long> {
    Page<BalanceGameResult> findByMember (Pageable pageable, Member member);
}
