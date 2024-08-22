package com.springboot.post.repository;

import com.springboot.member.entity.Member;
import com.springboot.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post,Long> {
    Page<Post> findByPostStatusNot(Pageable pageable, Post.PostStatus postStatus);
    Page<Post> findByMemberAndPostStatusNot(Pageable pageable, Member member, Post.PostStatus postStatus);
    Page<Post> findByCategoryAndPostStatusNot(Pageable pageable, String category, Post.PostStatus postStatus);
}
