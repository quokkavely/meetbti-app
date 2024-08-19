package com.springboot.imagegame_result.repository;

import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.imagegame_result.entity.ImageGameResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageGameResultRepository extends JpaRepository<ImageGameResult, Long> {
    Optional<BalanceGameResult> findByResultId(long resultId);
}
