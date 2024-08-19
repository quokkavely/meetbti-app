package com.springboot.member.dto;

import com.springboot.heart.entity.Heart;
import com.springboot.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class MemberResponseDto {
    private String email;
    private String image;
    private String nickname;
    private Member.MemberStatus memberStatus;
    private LocalDateTime banExpiration;
    private LocalDateTime createdAt;

    //이외 연관관계 활동내역들
    private List<Heart>hearts;
//    private List<TestResult> testResults;
//    private List<Post> posts;
//    private List<Comment> comments;
//    private List<Image_Comment> imageComments;
//    private List<Balance_Comment> balanceComments;
//    private List<BalanceGame_Result> balanceGameResults;
//    private List<ImageGame_Result> imageResults;


}
