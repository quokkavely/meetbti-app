package com.springboot.balancegame.repository;

import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.gamestatus.GameStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BalanceGameRepository extends JpaRepository<BalanceGame, Long> {
    Page<BalanceGame> findByGameStatusNot(Pageable pageable, GameStatus gameStatus);
}
