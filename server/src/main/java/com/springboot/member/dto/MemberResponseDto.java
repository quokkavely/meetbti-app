package com.springboot.member.dto;

import com.springboot.member.entity.Member;

import java.time.LocalDateTime;

public class MemberResponseDto {
    private Long memberId;
    private String email;
    private String image;
    private String nickname;
    private Member.MemberStatus memberStatus;
    private LocalDateTime banExpiration;
    private LocalDateTime createdAt;
}
