package com.springboot.comment.service;

import com.springboot.auth.Principal;
import com.springboot.comment.entity.Comment;
import com.springboot.comment.repository.CommentRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }
    public Comment createComment (Comment comment,Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        return commentRepository.save(comment);
    }
    public Comment updateComment (Comment comment) {
        Comment findComment = findComment(comment.getCommentId());

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));

        return commentRepository.save(findComment);
    }
    public Comment findComment (long commentId) {
        return findVerifiedComment(commentId);
    }
    //    public List<Comment> findComments (long memberId) {
//        return commentRepository.findByMember(memberId);
//    }
    public void deleteComment (long commentId) {
        Comment comment = findComment(commentId);

        commentRepository.delete(comment);
    }
    private Comment findVerifiedComment (long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);

        return comment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}
