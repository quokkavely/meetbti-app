package com.springboot.member.entity;

import com.springboot.balancegame_comment.entity.BalanceGameComment;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.imagegame_comment.entity.ImageGameComment;
import com.springboot.imagegame_result.entity.ImageGameResult;
import com.springboot.testresult.entity.TestResult;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 30, nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 10, nullable = false)
    private String nickname;

    @Column
    private String image;

    @Enumerated(value = EnumType.STRING)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime banExpiration;

//    @OneToMany (mappedBy = "member")
//    private List<Heart> hearts = new ArrayList<>();
//    public void setHeart(Heart heart){
//        hearts.add(heart);
//        if(heart.getMember()!=this){
//            heart.setMember(this);
//        }
//    }

    //    1) security 적용 후
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    //    2) MBTI 검사결과
    @OneToMany (mappedBy = "member")
    private List<TestResult> testResults = new ArrayList<>();

    public void setTestResult(TestResult testResult){
        testResults.add(testResult);
        if(testResult.getMember()!=this){
            testResult.setMember(this);
        }
    }

//   3) post 연관관계
//    @OneToMany (mappedBy = "member")
//    private List<Post> posts = new ArrayList<>();
//
//    public void setPosts(Post Post){
//        posts.add(post);
//        if(post.getMember()!=this){
//            post.setMember(this);
//        }
//    }

//    4) Comment 연관관계
//    @OneToMany (mappedBy = "member")
//    private List<Comment> comments = new ArrayList<>();
//
//    public void setComment(Comment comment){
//        comments.add(comment);
//        if(comment.getMember()!=this){
//            comment.setMember(this);
//        }
//    }

    //    5) imageComment 연관관계
    @OneToMany (mappedBy = "member")
    private List<ImageGameComment> imageComments = new ArrayList<>();

    public void setImageComment(ImageGameComment imageComment){
        imageComments.add(imageComment);
        if(imageComment.getMember()!=this){
            imageComment.setMember(this);
        }
    }

    //  6) balanceComment 연관관계
    @OneToMany (mappedBy = "member")
    private List<BalanceGameComment> balanceComments = new ArrayList<>();

    public void setBalanceComment(BalanceGameComment balanceComment){
        balanceComments.add(balanceComment);
        if(balanceComment.getMember()!=this){
            balanceComment.setMember(this);
        }
    }

    //  7) 밸런스게임결과 연관관계
    @OneToMany (mappedBy = "member")
    private List<BalanceGameResult> balanceGameResults = new ArrayList<>();

    public void setBalanceResult(BalanceGameResult balanceResult){
        balanceGameResults.add(balanceResult);
        if(balanceResult.getMember()!=this){
            balanceResult.setMember(this);
        }
    }

    // 8) 이미지게임결과 연관관계
    @OneToMany (mappedBy = "member")
    private List<ImageGameResult> imageResults = new ArrayList<>();

    public void setImageResult(ImageGameResult imageGameResult){
        imageResults.add(imageGameResult);
        if(imageGameResult.getMember()!=this){
            imageGameResult.setMember(this);
        }
    }


    public enum MemberStatus{
        MEMBER_ACTIVE("활동중"),
        MEMBER_BAN("활동 정지"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {this.status = status;}
    }

    public Member(String email) {
        this.email = email;
    }
}