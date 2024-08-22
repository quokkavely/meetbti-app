package com.springboot.balancegame.repository;

import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.gamestatus.GameStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BalanceGameRepository extends JpaRepository<BalanceGame, Long> {
    List<BalanceGame> findByGameStatusNot(GameStatus gameStatus);
}
