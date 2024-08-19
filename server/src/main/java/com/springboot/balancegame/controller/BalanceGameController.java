package com.springboot.balancegame.controller;

import com.springboot.balancegame.dto.BalanceGameDto;
import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame.mapper.BalanceGameMapper;
import com.springboot.balancegame.service.BalanceGameService;
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
@RequestMapping(path = "/balancegames")
@Validated
public class BalanceGameController {
    private final String DEFAULT_URL = "/balancegames";
    private final BalanceGameService service;
    private final BalanceGameMapper mapper;

    public BalanceGameController(BalanceGameService service, BalanceGameMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postGame(@Valid @RequestBody BalanceGameDto.Post postDto){
        BalanceGame tempGame = mapper.postDtoToGame(postDto);
        BalanceGame game = service.createGame(tempGame);

        URI location = UriCreator.createUri(DEFAULT_URL, game.getGameId());
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{game-id}")
    public ResponseEntity getGame(@PathVariable("game-id") @Positive long gameId){
        BalanceGame game = service.findGame(gameId);
        return new ResponseEntity(mapper.gameToGameResponseDto(game), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getGames(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size){
        Page<BalanceGame> pageGames = service.findGames(page-1, size);
        List<BalanceGame> games = pageGames.getContent();

        return new ResponseEntity(mapper.gamesToResponseDtos(games), HttpStatus.OK);
    }

    @DeleteMapping("/{game-id}")
    public ResponseEntity deleteGame(@PathVariable("game-id") @Positive long gameId){
        service.deleteGame(gameId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
