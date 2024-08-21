package com.springboot.balancegame.controller;

import com.springboot.auth.utils.Principal;
import com.springboot.balancegame.dto.BalanceGameDto;
import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame.mapper.BalanceGameMapper;
import com.springboot.balancegame.service.BalanceGameService;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
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
@RequestMapping("/balancegames")
@Validated
public class BalanceGameController {
    private final BalanceGameService balanceGameService;
    private final BalanceGameMapper balanceGameMapper;
    private final String DEFAULT_URL = "/balancegames";

    public BalanceGameController(BalanceGameService balanceGameService, BalanceGameMapper balanceGameMapper) {
        this.balanceGameService = balanceGameService;
        this.balanceGameMapper = balanceGameMapper;
    }

    @PostMapping
    public ResponseEntity postGame(@Valid @RequestBody BalanceGameDto.Post postDto,
                                   Authentication authentication){
        Principal principal = (Principal) authentication.getPrincipal();

        postDto.setNickName(principal.getNickName());

        BalanceGame balanceGame = balanceGameService.createGame(balanceGameMapper.postDtoToGame(postDto), authentication);

        URI location = UriCreator.createUri(DEFAULT_URL, balanceGame.getBalanceGameId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{game-id}")
    public ResponseEntity getGame(@PathVariable("game-id") @Positive long gameId){
        BalanceGame game = balanceGameService.findGame(gameId);
        return new ResponseEntity(balanceGameMapper.gameToGameResponseDto(game), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getGames(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size){
        Page<BalanceGame> pageGames = balanceGameService.findGames(page-1, size);
        List<BalanceGame> games = pageGames.getContent();

        return new ResponseEntity(balanceGameMapper.gamesToResponseDtos(games), HttpStatus.OK);
    }

    @DeleteMapping("/{game-id}")
    public ResponseEntity deleteGame(@PathVariable("game-id") @Positive long gameId){
        balanceGameService.deleteGame(gameId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
