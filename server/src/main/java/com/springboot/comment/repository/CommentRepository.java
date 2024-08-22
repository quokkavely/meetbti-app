package com.springboot.comment.repository;

import com.springboot.comment.entity.Comment;
import com.springboot.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    Page<Comment> findByMember(Pageable pageable, Member member);
}
