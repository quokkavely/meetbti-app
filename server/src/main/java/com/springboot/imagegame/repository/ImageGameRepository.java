package com.springboot.imagegame.repository;

import com.springboot.imagegame.entity.ImageGame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageGameRepository extends JpaRepository<ImageGame, Long> {
    Optional<ImageGame> findById(long gameId);
}
