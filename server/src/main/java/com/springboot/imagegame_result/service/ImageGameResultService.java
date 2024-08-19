package com.springboot.imagegame_result.service;

import com.springboot.imagegame_result.entity.ImageGameResult;
import com.springboot.imagegame_result.repository.ImageGameResultRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ImageGameResultService {
    private final ImageGameResultRepository repository;

    public ImageGameResultService(ImageGameResultRepository repository) {
        this.repository = repository;
    }
    public ImageGameResult createResult(ImageGameResult result){
        return repository.save(result);
    }
    public ImageGameResult findResult(long resultId){
        Optional<ImageGameResult> optionalResult = repository.findById(resultId);
        return optionalResult.orElseThrow(()-> new RuntimeException());
    }
    public List<ImageGameResult> findResults(){
        return repository.findAll();
    }
}
