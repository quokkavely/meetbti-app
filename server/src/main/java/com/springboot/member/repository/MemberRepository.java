package com.springboot.member.repository;

import com.springboot.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    boolean existsByNickname(String nickname);
    boolean existsByEmail(String email);
    List<Member> findByMemberStatus(Member.MemberStatus memberStatus);
}
