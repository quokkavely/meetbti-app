package com.springboot.imagegame_result.repository;

import com.springboot.imagegame_result.entity.ImageGameResult;
import com.springboot.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageGameResultRepository extends JpaRepository<ImageGameResult, Long> {
    Page<ImageGameResult> findByMember (Pageable pageable, Member member);
}
