package com.springboot.balancegame_comment.repository;

import com.springboot.balancegame_comment.entity.BalanceGameComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BalanceGameCommentRepository extends JpaRepository<BalanceGameComment, Long> {
    Optional<BalanceGameComment> findByCommentId(long commentId);
}
