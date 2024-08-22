package com.springboot.balancegame_result.service;

import com.springboot.auth.utils.Principal;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.balancegame_result.repository.BalanceGameResultRepository;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class BalanceGameResultService {
    private final BalanceGameResultRepository balanceGameResultRepository;
    private final MemberService memberService;

    public BalanceGameResultService(BalanceGameResultRepository repository, MemberService memberService) {
        this.balanceGameResultRepository = repository;
        this.memberService = memberService;
    }

    public BalanceGameResult createResult(BalanceGameResult result, Authentication authentication){
        Principal principal = (Principal) authentication.getPrincipal();

        Member member = memberService.findMember(principal.getMemberId());

        result.setMember(member);

        return balanceGameResultRepository.save(result);
    }
    public BalanceGameResult findResult(long resultId){
        Optional<BalanceGameResult> optionalResult = balanceGameResultRepository.findById(resultId);
        return optionalResult.orElseThrow(() -> new RuntimeException());
    }

    public List<BalanceGameResult> findResults(){
        return balanceGameResultRepository.findAll();
    }
}
