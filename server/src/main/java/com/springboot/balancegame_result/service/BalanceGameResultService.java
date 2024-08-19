package com.springboot.balancegame_result.service;

import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.balancegame_result.repository.BalanceGameResultRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class BalanceGameResultService {
    private final BalanceGameResultRepository repository;

    public BalanceGameResultService(BalanceGameResultRepository repository) {
        this.repository = repository;
    }

    public BalanceGameResult createResult(BalanceGameResult result){
        return repository.save(result);
    }
    public BalanceGameResult findResult(long resultId){
        Optional<BalanceGameResult> optionalResult = repository.findById(resultId);
        return optionalResult.orElseThrow(() -> new RuntimeException());
    }

    public List<BalanceGameResult> findResults(){
        return repository.findAll();
    }
}
