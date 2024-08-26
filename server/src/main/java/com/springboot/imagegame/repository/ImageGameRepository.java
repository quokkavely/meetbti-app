package com.springboot.imagegame.repository;

import com.springboot.gamestatus.GameStatus;
import com.springboot.imagegame.entity.ImageGame;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageGameRepository extends JpaRepository<ImageGame, Long> {

    Page<ImageGame> findByGameStatusNot(Pageable pageable, GameStatus gameStatus);
    Page<ImageGame> findByGameStatus(Pageable pageable, GameStatus gameStatus);
}
