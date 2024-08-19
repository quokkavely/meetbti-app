package com.springboot.imagegame_comment.repository;

import com.springboot.imagegame_comment.entity.ImageGameComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageGameCommentRepository extends JpaRepository<ImageGameComment, Long> {
    Optional<ImageGameComment> findByCommentId(long commentId);
}
