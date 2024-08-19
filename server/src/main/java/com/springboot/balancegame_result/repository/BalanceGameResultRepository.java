package com.springboot.balancegame_result.repository;

import com.springboot.balancegame_result.entity.BalanceGameResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BalanceGameResultRepository extends JpaRepository<BalanceGameResult, Long> {
    //Optional<BalanceGameResult> findByMemberId(long memberId);
    Optional<BalanceGameResult> findByResultId(long resultId);
}
