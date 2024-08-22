package com.springboot.heart.repository;

import com.springboot.heart.entity.Heart;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot.member.entity.Member;
import com.springboot.comment.entity.Comment;
import com.springboot.balancegame.entity.BalanceGame;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface HeartRepository extends JpaRepository<Heart, Long> {

    Optional<Heart> findByMemberAndPost(Member member, Post post);
    Optional<Heart> findByMemberAndComment(Member member, Comment comment);
    Optional<Heart> findByMemberAndImageGame(Member member, ImageGame imageGame);
    Optional<Heart> findByMemberAndBalanceGame(Member member, BalanceGame balanceGame);
    List<Heart> findByMember_MemberId(long memberId);
    // 특정 회원이 좋아요를 누른 Post 데이터를 조회
    @Query("SELECT h.post FROM Heart h WHERE h.member = :member AND h.contentType = 'POST'")
    Page<Post> findLikedPostsByMember(
            @Param("member") Member member,
            Pageable pageable);

    // 특정 회원이 좋아요를 누른 Comment 데이터를 조회
    @Query("SELECT h.comment FROM Heart h WHERE h.member = :member AND h.contentType = 'COMMENT'")
    Page<Comment> findLikedCommentsByMember(
            @Param("member") Member member,
            Pageable pageable);

    // 특정 회원이 좋아요를 누른 ImageGame 데이터를 조회
    @Query("SELECT h.imageGame FROM Heart h WHERE h.member = :member AND h.contentType = 'IMAGE_GAME'")
    Page<ImageGame> findLikedImageGamesByMember(
            @Param("member") Member member,
            Pageable pageable);

    // 특정 회원이 좋아요를 누른 BalanceGame 데이터를 조회
    @Query("SELECT h.balanceGame FROM Heart h WHERE h.member = :member AND h.contentType = 'BALANCE_GAME'")
    Page<BalanceGame> findLikedBalanceGamesByMember(
            @Param("member") Member member,
            Pageable pageable);
}

