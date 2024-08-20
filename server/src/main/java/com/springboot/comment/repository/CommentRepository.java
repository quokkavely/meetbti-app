package com.springboot.comment.repository;


import com.springboot.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
//    List<Comment> findByMember(Member member);
}
