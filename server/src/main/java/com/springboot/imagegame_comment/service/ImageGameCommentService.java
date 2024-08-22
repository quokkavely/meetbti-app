package com.springboot.imagegame_comment.service;

import com.springboot.auth.utils.Principal;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.imagegame_comment.entity.ImageGameComment;
import com.springboot.imagegame_comment.repository.ImageGameCommentRepository;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ImageGameCommentService {
    private final ImageGameCommentRepository imageGameCommentRepository;
    private final MemberService memberService;

    public ImageGameCommentService (ImageGameCommentRepository repository, MemberService memberService) {
        this.imageGameCommentRepository = repository;
        this.memberService = memberService;
    }

    public ImageGameComment createComment(ImageGameComment comment, Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Member findMember = memberService.findMember(principal.getMemberId());

        comment.setMember(findMember);

        return imageGameCommentRepository.save(comment);
    }
    public ImageGameComment updateComment(ImageGameComment comment, Authentication authentication){
        Principal principal = (Principal) authentication.getPrincipal();

        ImageGameComment findComment = findVerifiedComment(comment.getCommentId());

        if (principal.getMemberId() != findComment.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }

        Optional.ofNullable(comment.getContent())
                .ifPresent(findComment::setContent);

        findComment.setModifiedAt(LocalDateTime.now());

        return imageGameCommentRepository.save(findComment);
    }
    public ImageGameComment findComment(long commentId) {
        return findVerifiedComment(commentId);
    }
    public Page<ImageGameComment> findComments(int page, int size, long memberId, Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Member findMember = memberService.findMember(principal.getMemberId());

        if (memberId != findMember.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }

        Pageable pageable = PageRequest.of(page, size);

        return imageGameCommentRepository.findByMember(pageable, findMember);
    }
    public void deleteComment(long commentId) {
        ImageGameComment comment = findVerifiedComment(commentId);
        imageGameCommentRepository.delete(comment);
    }
    public ImageGameComment findVerifiedComment(long commentId) {
        Optional<ImageGameComment> optionalComment = imageGameCommentRepository.findByCommentId(commentId);

        return optionalComment.orElseThrow(()-> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}
