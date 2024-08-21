package com.springboot.imagegame.service;

import com.springboot.imagegame.entity.ImageGame;
import com.springboot.imagegame.repository.ImageGameRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class ImageGameService {
    private final ImageGameRepository repository;

    public ImageGameService (ImageGameRepository repository) {
        this.repository = repository;
    }
    public ImageGame createGame (ImageGame game) {
        return repository.save(game);
    }
    public ImageGame findGame (long gameId) {
        return findVerifiedGame(gameId);
    }
    public Page<ImageGame> findGames (int page, int size) {
        return repository.findAll(PageRequest.of(page, size, Sort.by("gameId").descending()));
    }
    public void deleteGame (long gameId) {
        ImageGame game = findVerifiedGame(gameId);
        repository.delete(game);
    }
    public ImageGame findVerifiedGame(long gameId){
        Optional<ImageGame> optionalGame = repository.findById(gameId);
        return optionalGame.orElseThrow(() -> new RuntimeException());
    }
}
