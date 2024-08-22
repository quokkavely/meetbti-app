package com.springboot.balancegame_comment.repository;

import com.springboot.balancegame_comment.entity.BalanceGameComment;
import com.springboot.comment.entity.Comment;
import com.springboot.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BalanceGameCommentRepository extends JpaRepository<BalanceGameComment, Long> {
    Optional<BalanceGameComment> findByCommentId(long commentId);

    Page<BalanceGameComment> findByMember(Pageable pageable, Member member);
}
