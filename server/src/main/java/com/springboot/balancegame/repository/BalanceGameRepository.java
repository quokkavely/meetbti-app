package com.springboot.balancegame.repository;

import com.springboot.balancegame.entity.BalanceGame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BalanceGameRepository extends JpaRepository<BalanceGame, Long> {
    Optional<BalanceGame> findById(long gameId);
}
