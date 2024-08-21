package com.springboot.balancegame_comment.service;

import com.springboot.auth.utils.Principal;
import com.springboot.balancegame_comment.entity.BalanceGameComment;
import com.springboot.balancegame_comment.repository.BalanceGameCommentRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BalanceGameCommentService {
    private final BalanceGameCommentRepository balanceGameCommentRepository;
    private final MemberService memberService;

    public BalanceGameCommentService(BalanceGameCommentRepository repository, MemberService memberService) {
        this.balanceGameCommentRepository = repository;
        this.memberService = memberService;
    }

    public BalanceGameComment createComment (BalanceGameComment comment, Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Member findMember = memberService.findMember(principal.getMemberId());

        comment.setMember(findMember);

        return balanceGameCommentRepository.save(comment);
    }
    public BalanceGameComment updateComment(BalanceGameComment comment, Authentication authentication){
        Principal principal = (Principal) authentication.getPrincipal();

        BalanceGameComment findComment = findVerifiedComment(comment.getCommentId());

        if (principal.getMemberId() != findComment.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }

        Optional.ofNullable(comment.getContent())
                .ifPresent(findComment::setContent);

        findComment.setModifiedAt(LocalDateTime.now());

        return balanceGameCommentRepository.save(findComment);
    }
    public BalanceGameComment findComment (long commentId) {
        return findVerifiedComment(commentId);
    }
    public List<BalanceGameComment> findComments() {
        return balanceGameCommentRepository.findAll();
    }
    public void deleteComment(long commentId){
        BalanceGameComment comment = findVerifiedComment(commentId);
        balanceGameCommentRepository.delete(comment);
    }
    public BalanceGameComment findVerifiedComment (long commentId) {
        Optional<BalanceGameComment> optionalComment = balanceGameCommentRepository.findByCommentId(commentId);

        return optionalComment.orElseThrow(()-> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}
