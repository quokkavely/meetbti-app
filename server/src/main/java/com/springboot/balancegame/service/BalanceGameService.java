package com.springboot.balancegame.service;

import com.springboot.auth.utils.Principal;
import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame.repository.BalanceGameRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.gamestatus.GameStatus;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BalanceGameService {
    private final BalanceGameRepository balanceGameRepository;
    private final MemberService memberService;

    public BalanceGameService(BalanceGameRepository repository, MemberService memberService) {
        this.balanceGameRepository = repository;
        this.memberService = memberService;
    }
    public BalanceGame createGame(BalanceGame game, Authentication authentication) {
        return balanceGameRepository.save(game);
    }
    public BalanceGame findGame(long gameId, Authentication authentication) {
       BalanceGame balanceGame = findVerifiedGame(gameId);

       if(!isAdmin(authentication) && balanceGame.getGameStatus().equals(GameStatus.PENDING)) {
           throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
       }
        return findVerifiedGame(gameId);
    }
    public Page<BalanceGame> findGames(int page, int size, Authentication authentication) {

        Pageable pageable = PageRequest.of(page, size);
        //일반 회원
        if(!isAdmin(authentication)) {
            return balanceGameRepository.findByGameStatusNot(pageable, GameStatus.PENDING);
        }
        //관리자
        return balanceGameRepository.findByGameStatus(pageable, GameStatus.PENDING);
    }
    public BalanceGame findVerifiedGame(long gameId) {
        Optional<BalanceGame> optionalGame = balanceGameRepository.findById(gameId);

        return optionalGame.orElseThrow(() -> new BusinessLogicException(ExceptionCode.GAME_NOT_FOUND));
    }

    //관리자 승인
    public BalanceGame acceptGame(long gameId, Authentication authentication) {

        BalanceGame balanceGame = findVerifiedGame(gameId);

        if(!isAdmin(authentication)) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }

        balanceGame.setGameStatus(GameStatus.ACTIVE);
        return balanceGameRepository.save(balanceGame);
    }
    //관리자만 가능
    public void deleteGame(long gameId, Authentication authentication) {

        if(!isAdmin(authentication)) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }

        BalanceGame game = findVerifiedGame(gameId);
        balanceGameRepository.delete(game);
    }

    private boolean isAdmin(Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();
        Member member = memberService.findMember(principal.getMemberId());
        return member.getRoles().contains("ADMIN");
    }
}
