package com.springboot.comment.service;

import com.springboot.auth.utils.Principal;
import com.springboot.comment.entity.Comment;
import com.springboot.comment.repository.CommentRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberService memberService;

    public CommentService(CommentRepository commentRepository, MemberService memberService) {
        this.commentRepository = commentRepository;
        this.memberService = memberService;
    }
    public Comment createComment(Comment comment, Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Member findMember = memberService.findMember(principal.getMemberId());

        comment.setMember(findMember);

        return commentRepository.save(comment);
    }
    public Comment updateComment (Comment comment, Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Comment findComment = findVerifiedComment(comment.getCommentId());

        if (principal.getMemberId() != comment.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }
        Optional.ofNullable(comment.getContent())
                .ifPresent(findComment::setContent);

        return commentRepository.save(findComment);
    }
    public Page<Comment> findComments(int page, int size, long memberId, Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Member findMember = memberService.findMember(principal.getMemberId());

        if (memberId != findMember.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }

        Pageable pageable = PageRequest.of(page, size);

        return commentRepository.findByMember(pageable, findMember);
    }
    public void deleteComment (long commentId, Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Comment comment = findVerifiedComment(commentId);

        if (principal.getMemberId() != comment.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }

        commentRepository.delete(comment);
    }

    public Comment findComment (Long commentId) {
        return findVerifiedComment(commentId);
    }

    private Comment findVerifiedComment (long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);

        return comment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}
