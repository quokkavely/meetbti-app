package com.springboot.imagegame_result.controller;

import com.springboot.imagegame.entity.ImageGame;
import com.springboot.imagegame.mapper.ImageGameMapper;
import com.springboot.imagegame.service.ImageGameService;
import com.springboot.imagegame_comment.mapper.ImageGameCommentMapper;
import com.springboot.imagegame_result.dto.ImageGameResultDto;
import com.springboot.imagegame_result.entity.ImageGameResult;
import com.springboot.imagegame_result.mapper.ImageGameResultMapper;
import com.springboot.imagegame_result.service.ImageGameResultService;
import com.springboot.response.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping
@Validated
public class ImageGameResultController {
    private final ImageGameResultService imageGameResultService;
    private final ImageGameResultMapper imageGameResultMapper;
    private final ImageGameService imageGameService;
    private final ImageGameMapper imageGameMapper;
    private final ImageGameCommentMapper imageGameCommentMapper;
    private final String DEFAULT_URL = "/imagegame-results";

    public ImageGameResultController(ImageGameResultMapper mapper, ImageGameResultService service, ImageGameService imageGameService, ImageGameMapper imageGameMapper, ImageGameCommentMapper imageGameCommentMapper) {
        this.imageGameResultMapper = mapper;
        this.imageGameResultService = service;
        this.imageGameService = imageGameService;
        this.imageGameMapper = imageGameMapper;
        this.imageGameCommentMapper = imageGameCommentMapper;
    }

    @PostMapping("/imagegames/{imagegame-id}/imagegame-results")
    public ResponseEntity postResult (@PathVariable("imagegame-id") @Positive long gameId,
                                      @Valid @RequestBody ImageGameResultDto.Post postDto,
                                      Authentication authentication) {
        postDto.setGameId(gameId);

        ImageGameResult result = imageGameResultService.createResult(imageGameResultMapper.postDtoToResult(postDto), authentication);

        ImageGame game = imageGameService.findGame(result.getImageGame().getImageGameId(), authentication);

        return new ResponseEntity<>(new SingleResponseDto<>(imageGameMapper.gameToGameResponseDto(game, authentication, imageGameCommentMapper)), HttpStatus.CREATED);
    }
    @GetMapping("/imagegame-results")
    public ResponseEntity getResults(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size,
                                     @Positive @RequestParam(name = "member-id") Long memberId,
                                     Authentication authentication) {
        if (memberId == null)  throw new IllegalArgumentException("Member ID is required");

        Page<ImageGameResult> pageBalanceGameComment = imageGameResultService.findResults(page - 1, size, memberId, authentication);

        List<ImageGameResult> imageGameResults = pageBalanceGameComment.getContent();

        return new ResponseEntity<>(imageGameResultMapper.resultsToResponseDtos(imageGameResults), HttpStatus.OK);
    }
}
