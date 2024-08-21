package com.springboot.imagegame_result.service;

import com.springboot.auth.utils.Principal;
import com.springboot.imagegame_result.entity.ImageGameResult;
import com.springboot.imagegame_result.repository.ImageGameResultRepository;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ImageGameResultService {
    private final ImageGameResultRepository imageGameResultRepository;
    private final MemberService memberService;

    public ImageGameResultService(ImageGameResultRepository imageGameResultRepository, MemberService memberService) {
        this.imageGameResultRepository = imageGameResultRepository;
        this.memberService = memberService;
    }

    public ImageGameResult createResult (ImageGameResult imageGameResult, Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Member findMember = memberService.findMember(principal.getMemberId());

        imageGameResult.setMember(findMember);

        return imageGameResultRepository.save(imageGameResult);
    }
    public ImageGameResult findResult(long resultId){
        Optional<ImageGameResult> optionalResult = imageGameResultRepository.findById(resultId);
        return optionalResult.orElseThrow(()-> new RuntimeException());
    }
    public List<ImageGameResult> findResults(){
        return imageGameResultRepository.findAll();
    }
}
