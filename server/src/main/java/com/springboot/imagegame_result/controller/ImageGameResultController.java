package com.springboot.imagegame_result.controller;

import com.springboot.imagegame_result.dto.ImageGameResultDto;
import com.springboot.imagegame_result.entity.ImageGameResult;
import com.springboot.imagegame_result.mapper.ImageGameResultMapper;
import com.springboot.imagegame_result.service.ImageGameResultService;
import com.springboot.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping
@Validated
public class ImageGameResultController {
    private final ImageGameResultService imageGameResultService;
    private final ImageGameResultMapper imageGameResultMapper;
    private final String DEFAULT_URL = "/imagegame-results";

    public ImageGameResultController(ImageGameResultMapper mapper, ImageGameResultService service) {
        this.imageGameResultMapper = mapper;
        this.imageGameResultService = service;
    }

    @PostMapping("/imagegames/{imagegame-id}/imagegame-results")
    public ResponseEntity postResult (@PathVariable("imagegame-id") @Positive long gameId,
                                      @Valid @RequestBody ImageGameResultDto.Post postDto,
                                      Authentication authentication){
        postDto.setGameId(gameId);

        ImageGameResult result = imageGameResultService.createResult(imageGameResultMapper.postDtoToResult(postDto), authentication);

        URI location = UriCreator.createUri(DEFAULT_URL, result.getResultId());

        return new ResponseEntity(HttpStatus.CREATED);
    }
//    @GetMapping("/{result-id}")
//    public ResponseEntity getResult(@PathVariable("result-id") @Positive long resultId){
//        ImageGameResult result = imageGameResultService.findResult(resultId);
//        return new ResponseEntity(imageGameResultMapper.resultToResponseDto(result), HttpStatus.OK);
//    }

    @GetMapping("/imagegame-results")
    public ResponseEntity getResults(){
        List<ImageGameResult> results = imageGameResultService.findResults();
        return new ResponseEntity(imageGameResultMapper.resultsToResponseDtos(results), HttpStatus.OK);
    }
}
