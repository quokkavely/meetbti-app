package com.springboot.balancegame_comment.service;

import com.springboot.balancegame_comment.entity.BalanceGameComment;
import com.springboot.balancegame_comment.repository.BalanceGameCommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class BalanceGameCommentService {
    private final BalanceGameCommentRepository repository;

    public BalanceGameCommentService(BalanceGameCommentRepository repository) {
        this.repository = repository;
    }

    public BalanceGameComment createComment(BalanceGameComment comment){
        return repository.save(comment);
    }

    public BalanceGameComment findComment(long commentId){
        return findVerifiedComment(commentId);
    }
    public List<BalanceGameComment> findComments(){
        return repository.findAll();
    }
    public BalanceGameComment updateComment(BalanceGameComment comment){
        BalanceGameComment findComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));
        findComment.setModifiedAt(LocalDateTime.now());

        return repository.save(findComment);
    }
    public void deleteComment(long commentId){
        BalanceGameComment comment = findVerifiedComment(commentId);
        repository.delete(comment);
    }
    public BalanceGameComment findVerifiedComment(long commentId){
        Optional<BalanceGameComment> optionalComment = repository.findByCommentId(commentId);
        return optionalComment.orElseThrow(() -> new RuntimeException());
    }
}
