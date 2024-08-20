package com.springboot.heart.repository;

import com.springboot.heart.entity.Heart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HeartRepository extends JpaRepository<Heart, Long> {
    Optional<Heart> findByMember_MemberIdAndTypeAndTargetId(Long memberId, String type, Long targetId);
    List<Heart> findByMember_MemberId(Long memberId);
}
