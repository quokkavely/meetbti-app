package com.springboot.imagegame.service;

import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.gamestatus.GameStatus;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.imagegame.repository.ImageGameRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class ImageGameService {
    private final ImageGameRepository imageGameRepository;

    public ImageGameService (ImageGameRepository repository) {
        this.imageGameRepository = repository;
    }
    public ImageGame createGame(ImageGame game, Authentication authentication) {
        return imageGameRepository.save(game);
    }
    public ImageGame findGame(long gameId) {
        return findVerifiedGame(gameId);
    }
    public Page<ImageGame> findGames(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return imageGameRepository.findByGameStatusNot(pageable, GameStatus.PENDING);
    }
    public void deleteGame(long gameId) {
        ImageGame game = findVerifiedGame(gameId);
        imageGameRepository.delete(game);
    }
    public ImageGame findVerifiedGame(long gameId){
        Optional<ImageGame> optionalGame = imageGameRepository.findById(gameId);

        return optionalGame.orElseThrow(() -> new BusinessLogicException(ExceptionCode.GAME_NOT_FOUND));
    }
}
