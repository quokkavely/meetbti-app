package com.springboot.imagegame.repository;

import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.gamestatus.GameStatus;
import com.springboot.imagegame.entity.ImageGame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImageGameRepository extends JpaRepository<ImageGame, Long> {
    List<ImageGame> findByGameStatusNot(GameStatus gameStatus);
}
