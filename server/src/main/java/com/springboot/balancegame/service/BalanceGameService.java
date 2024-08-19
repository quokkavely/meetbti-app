package com.springboot.balancegame.service;

import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame.repository.BalanceGameRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class BalanceGameService {
    private final BalanceGameRepository repository;

    public BalanceGameService(BalanceGameRepository repository) {
        this.repository = repository;
    }

    public BalanceGame createGame(BalanceGame game){
        return repository.save(game);
    };

    public BalanceGame findGame(long gameId){
        return findVerifiedGame(gameId);
    }
    public Page<BalanceGame> findGames(int page, int size){
        return repository.findAll(PageRequest.of(page, size, Sort.by("gameId").descending()));
    }
    public void deleteGame(long gameId){
        BalanceGame game = findVerifiedGame(gameId);
        repository.delete(game);
    }
    public BalanceGame findVerifiedGame(long gameId){
        Optional<BalanceGame> optionalGame = repository.findByGameId(gameId);
        return optionalGame.orElseThrow(() -> new RuntimeException());
    }
}
