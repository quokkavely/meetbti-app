package com.springboot.imagegame_comment.repository;

import com.springboot.imagegame_comment.entity.ImageGameComment;
import com.springboot.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageGameCommentRepository extends JpaRepository<ImageGameComment, Long> {
    Optional<ImageGameComment> findByCommentId(long commentId);
    Page<ImageGameComment> findByMember(Pageable pageable, Member member);
}
