package com.springboot.imagegame_result.controller;

import com.springboot.imagegame_result.dto.ImageGameResultDto;
import com.springboot.imagegame_result.entity.ImageGameResult;
import com.springboot.imagegame_result.mapper.ImageGameResultMapper;
import com.springboot.imagegame_result.service.ImageGameResultService;
import com.springboot.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/imagegame-results")
public class ImageGameResultController {
    private final String DEFAULT_URL = "/imagegame-results";
    private final ImageGameResultMapper mapper;
    private final ImageGameResultService service;

    public ImageGameResultController(ImageGameResultMapper mapper, ImageGameResultService service) {
        this.mapper = mapper;
        this.service = service;
    }

    @PostMapping
    public ResponseEntity postResult(@Valid @RequestBody ImageGameResultDto.Post postDto){
        ImageGameResult tempResult = mapper.postDtoToResult(postDto);
        ImageGameResult result = service.createResult(tempResult);

        URI location = UriCreator.createUri(DEFAULT_URL, result.getResultId());
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{result-id}")
    public ResponseEntity getResult(@PathVariable("result-id") @Positive long resultId){
        ImageGameResult result = service.findResult(resultId);
        return new ResponseEntity(mapper.resultToResponseDto(result), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getResults(){
        List<ImageGameResult> results = service.findResults();
        return new ResponseEntity(mapper.resultsToResponseDtos(results), HttpStatus.OK);
    }
}
