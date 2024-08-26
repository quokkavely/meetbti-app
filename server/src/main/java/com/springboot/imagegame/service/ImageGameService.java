package com.springboot.imagegame.service;

import com.springboot.auth.utils.Principal;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.gamestatus.GameStatus;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.imagegame.repository.ImageGameRepository;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class ImageGameService {
    private final ImageGameRepository imageGameRepository;
    private final MemberService memberService;

    public ImageGameService (ImageGameRepository repository, MemberService memberService) {
        this.imageGameRepository = repository;
        this.memberService = memberService;
    }

    public ImageGame createGame(ImageGame game, Authentication authentication) {
        return imageGameRepository.save(game);
    }

    public ImageGame findGame(long gameId, Authentication authentication) {

        ImageGame imageGame = findVerifiedGame(gameId);

        if(!isAdmin(authentication) && imageGame.getGameStatus().equals(GameStatus.PENDING)) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }

        return findVerifiedGame(gameId);
    }

    public Page<ImageGame> findGames(int page, int size, Authentication authentication) {
        Pageable pageable = PageRequest.of(page, size);

        if(!isAdmin(authentication)) {
            imageGameRepository.findByGameStatusNot(pageable, GameStatus.PENDING);
        }

        return imageGameRepository.findByGameStatus(pageable, GameStatus.PENDING);
    }

    public ImageGame findVerifiedGame(long gameId){
        Optional<ImageGame> optionalGame = imageGameRepository.findById(gameId);

        return optionalGame.orElseThrow(() -> new BusinessLogicException(ExceptionCode.GAME_NOT_FOUND));
    }

    //관리자 승인
    public ImageGame acceptGame(long gameId, Authentication authentication) {

        ImageGame imageGame = findVerifiedGame(gameId);

        if(!isAdmin(authentication)) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }

        imageGame.setGameStatus(GameStatus.ACTIVE);
        return imageGameRepository.save(imageGame);
    }

    //관리자만 가능
    public void deleteGame(long gameId, Authentication authentication) {

        if(!isAdmin(authentication)) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }

        ImageGame game = findVerifiedGame(gameId);
        imageGameRepository.delete(game);
    }

    private boolean isAdmin(Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();
        Member member = memberService.findMember(principal.getMemberId());
        return member.getRoles().contains("ADMIN");
    }
}
