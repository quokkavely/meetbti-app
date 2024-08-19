package com.springboot.imagegame_comment.service;

import com.springboot.imagegame_comment.entity.ImageGameComment;
import com.springboot.imagegame_comment.repository.ImageGameCommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ImageGameCommentService {
    private final ImageGameCommentRepository repository;

    public ImageGameCommentService(ImageGameCommentRepository repository) {
        this.repository = repository;
    }

    public ImageGameComment createComment(ImageGameComment comment){
        return repository.save(comment);
    }

    public ImageGameComment findComment(long commentId){
        return findVerifiedComment(commentId);
    }
    public List<ImageGameComment> findComments(){
        return repository.findAll();
    }
    public ImageGameComment updateComment(ImageGameComment comment){
        ImageGameComment findComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));
        findComment.setModifiedAt(LocalDateTime.now());

        return repository.save(findComment);
    }

    public void deleteComment(long commentId){
        ImageGameComment comment = findVerifiedComment(commentId);
        repository.delete(comment);
    }
    public ImageGameComment findVerifiedComment(long commentId){
        Optional<ImageGameComment> optionalComment = repository.findByCommentId(commentId);
        return optionalComment.orElseThrow(()-> new RuntimeException());
    }
}
