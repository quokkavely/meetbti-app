package com.springboot.imagegame.controller;

import com.springboot.imagegame.dto.ImageGameDto;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.imagegame.mapper.ImageGameMapper;
import com.springboot.imagegame.service.ImageGameService;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/imagegames")
@Validated
public class ImageGameController {
    private final String DEFAULT_URL = "/imagegames";
    private final ImageGameService service;
    private final ImageGameMapper mapper;

    public ImageGameController(ImageGameService service, ImageGameMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postGame(@Valid @RequestBody ImageGameDto.Post postDto){
        ImageGame tempGame = mapper.postDtoToGame(postDto);
        ImageGame game = service.createGame(tempGame);

        URI location = UriCreator.createUri(DEFAULT_URL, game.getGameId());
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{game-id}")
    public ResponseEntity getGame(@PathVariable("game-id") @Positive long gameId){
        ImageGame game = service.findGame(gameId);
        return new ResponseEntity(mapper.gameToResponseDto(game), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getGames(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size){
        Page<ImageGame> pageGames = service.findGames(page-1, size);
        List<ImageGame> games = pageGames.getContent();

        return new ResponseEntity(mapper.gamesToResponseDtos(games), HttpStatus.OK);
    }

    @DeleteMapping("/{game-id}")
    public ResponseEntity deleteGames(@PathVariable("game-id") @Positive long gameId){
        service.deleteGame(gameId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
