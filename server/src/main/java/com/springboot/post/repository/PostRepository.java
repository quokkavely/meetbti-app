package com.springboot.post.repository;

import com.springboot.member.entity.Member;
import com.springboot.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post,Long> {
    Page<Post> findByPostStatusNot(Pageable pageable, Post.PostStatus postStatus);
    Page<Post> findByMemberAndPostStatusNot(Pageable pageable, Member member, Post.PostStatus postStatus);
    // 모든 카테고리의 posts를 comments 개수로 정렬
    @Query("SELECT p FROM Post p LEFT JOIN p.comments c WHERE p.postStatus <> :postStatus GROUP BY p.postId ORDER BY COUNT(c) DESC")
    Page<Post> findByPostStatusNotOrderByComments(Pageable pageable, @Param("postStatus") Post.PostStatus postStatus);

    // 모든 카테고리의 posts를 hearts 개수로 정렬
    @Query("SELECT p FROM Post p LEFT JOIN p.hearts h WHERE p.postStatus <> :postStatus GROUP BY p.postId ORDER BY COUNT(h) DESC")
    Page<Post> findByPostStatusNotOrderByHearts(Pageable pageable, @Param("postStatus") Post.PostStatus postStatus);

    // 모든 카테고리의 posts를 views 개수로 정렬
    @Query("SELECT p FROM Post p LEFT JOIN p.views v WHERE p.postStatus <> :postStatus GROUP BY p.postId ORDER BY COUNT(v) DESC")
    Page<Post> findByPostStatusNotOrderByViews(Pageable pageable, @Param("postStatus") Post.PostStatus postStatus);

    // 모든 카테고리의 posts를 createdAt 기준으로 정렬
    @Query("SELECT p FROM Post p WHERE p.postStatus <> :postStatus ORDER BY p.createdAt DESC")
    Page<Post> findByPostStatusNotOrderByCreatedAt(Pageable pageable, @Param("postStatus") Post.PostStatus postStatus);

    // comments 개수로 정렬
    @Query("SELECT p FROM Post p LEFT JOIN p.comments c WHERE (:category = 'ALL' OR p.category = :category) AND p.postStatus <> :postStatus GROUP BY p.postId ORDER BY COUxNT(c) DESC")
    Page<Post> findByCategoryAndPostStatusNotOrderByComments(Pageable pageable, @Param("category") String category, @Param("postStatus") Post.PostStatus postStatus);

    // hearts 개수로 정렬
    @Query("SELECT p FROM Post p LEFT JOIN p.hearts h WHERE (:category = 'ALL' OR p.category = :category) AND p.postStatus <> :postStatus GROUP BY p.postId ORDER BY COUNT(h) DESC")
    Page<Post> findByCategoryAndPostStatusNotOrderByHearts(Pageable pageable, @Param("category") String category, @Param("postStatus") Post.PostStatus postStatus);

    // views 개수로 정렬
    @Query("SELECT p FROM Post p LEFT JOIN p.views v WHERE (:category = 'ALL' OR p.category = :category) AND p.postStatus <> :postStatus GROUP BY p.postId ORDER BY COUNT(v) DESC")
    Page<Post> findByCategoryAndPostStatusNotOrderByViews(Pageable pageable, @Param("category") String category, @Param("postStatus") Post.PostStatus postStatus);

    // 기본 createdAt 기준으로 정렬
    @Query("SELECT p FROM Post p WHERE (:category = 'ALL' OR p.category = :category) AND p.postStatus <> :postStatus ORDER BY p.createdAt DESC")
    Page<Post> findByCategoryAndPostStatusNotOrderByCreatedAt(Pageable pageable, @Param("category") String category, @Param("postStatus") Post.PostStatus postStatus);
}
