package com.springboot.heart.repository;

import com.springboot.heart.entity.Heart;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot.member.entity.Member;
import com.springboot.comment.entity.Comment;
import com.springboot.balancegame.entity.BalanceGame;
import java.util.List;
import java.util.Optional;


public interface HeartRepository extends JpaRepository<Heart, Long> {

    Optional<Heart> findByMemberAndPost(Member member, Post post);
    Optional<Heart> findByMemberAndComment(Member member, Comment comment);
    Optional<Heart> findByMemberAndImageGame(Member member, ImageGame imageGame);
    Optional<Heart> findByMemberAndBalanceGame(Member member, BalanceGame balanceGame);
    List<Heart> findByMember_MemberId(long memberId);
}

