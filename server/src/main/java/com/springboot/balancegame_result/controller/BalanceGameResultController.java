package com.springboot.balancegame_result.controller;

import com.springboot.auth.utils.Principal;
import com.springboot.balancegame_result.dto.BalanceGameResultDto;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.balancegame_result.mapper.BalanceGameResultMapper;
import com.springboot.balancegame_result.service.BalanceGameResultService;
import com.springboot.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/balancegame-results")
public class BalanceGameResultController {
    private final String DEFAULT_URL = "/balancegame-results";
    private final BalanceGameResultMapper mapper;
    private final BalanceGameResultService service;

    public BalanceGameResultController(BalanceGameResultMapper mapper, BalanceGameResultService service) {
        this.mapper = mapper;
        this.service = service;
    }

    @PostMapping
    public ResponseEntity postResult(@Valid @RequestBody BalanceGameResultDto.Post postDto,
                                     Authentication authentication){
        BalanceGameResult tempResult = mapper.postDtoToResult(postDto);
        BalanceGameResult result = service.createResult(tempResult, authentication);

        URI location = UriCreator.createUri(DEFAULT_URL, result.getResultId());
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{result-id}")
    public ResponseEntity getResult(@PathVariable("result-id") @Positive long resultId){
        BalanceGameResult result = service.findResult(resultId);
        return new ResponseEntity(mapper.resultToResponseDto(result), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getResults(){
        List<BalanceGameResult> results = service.findResults();
        return new ResponseEntity(mapper.resultsToResponseDtos(results), HttpStatus.OK);
    }
}
