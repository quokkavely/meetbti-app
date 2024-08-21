package com.springboot.member.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.balancegame_comment.entity.BalanceGameComment;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.comment.entity.Comment;
import com.springboot.heart.entity.Heart;
import com.springboot.imagegame_comment.entity.ImageGameComment;
import com.springboot.imagegame_result.entity.ImageGameResult;
import com.springboot.post.entity.Post;
import com.springboot.testresult.entity.TestResult;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(length = 30, nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 10, nullable = false)
    private String nickname;

    @Column
    private String image;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 10, nullable = false)
    private MemberStatus memberStatus = MemberStatus.ACTIVE;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private Date banExpiration;

    //    1) security 적용 후
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany (mappedBy = "member")
    @JsonBackReference
    private List<Heart> hearts = new ArrayList<>();
//    public void setHeart(Heart heart){
//        hearts.add(heart);
//        if(heart.getMember()!=this){
//            heart.setMember(this);
//        }
//    }
    @OneToMany (mappedBy = "member")
    @JsonBackReference
    private List<TestResult> testResults = new ArrayList<>();
//    public void setTestResult(TestResult testResult){
//        testResults.add(testResult);
//        if(testResult.getMember()!=this){
//            testResult.setMember(this);
//        }
//    }
    @OneToMany (mappedBy = "member")
    private List<Post> posts = new ArrayList<>();
//    public void setPosts(Post post){
//        posts.add(post);
//        if(post.getMember()!=this){
//            post.setMember(this);
//        }
//    }
    @OneToMany (mappedBy = "member")
    @JsonBackReference
    private List<Comment> comments = new ArrayList<>();

//    public void setComment(Comment comment){
//        comments.add(comment);
//        if(comment.getMember()!=this){
//            comment.setMember(this);
//        }
//    }
    @OneToMany (mappedBy = "member")
    @JsonBackReference
    private List<ImageGameComment> imageComments = new ArrayList<>();

//    public void setImageComment(ImageGameComment imageComment){
//        imageComments.add(imageComment);
//        if(imageComment.getMember()!=this){
//            imageComment.setMember(this);
//        }
//    }
    @OneToMany (mappedBy = "member")
    @JsonBackReference
    private List<BalanceGameComment> balanceComments = new ArrayList<>();

//    public void setBalanceComment(BalanceGameComment balanceComment){
//        balanceComments.add(balanceComment);
//        if(balanceComment.getMember()!=this){
//            balanceComment.setMember(this);
//        }
//    }
    @OneToMany (mappedBy = "member")
    @JsonBackReference
    private List<BalanceGameResult> balanceGameResults = new ArrayList<>();

//    public void setBalanceResult(BalanceGameResult balanceResult){
//        balanceGameResults.add(balanceResult);
//        if(balanceResult.getMember()!=this){
//            balanceResult.setMember(this);
//        }
//    }
    @OneToMany (mappedBy = "member")
    @JsonBackReference
    private List<ImageGameResult> imageResults = new ArrayList<>();

//    public void setImageResult(ImageGameResult imageGameResult){
//        imageResults.add(imageGameResult);
//        if(imageGameResult.getMember()!=this){
//            imageGameResult.setMember(this);
//        }
//    }
    public enum MemberStatus{
        ACTIVE("활동중"),
        BAN("활동 정지"),
        QUIT("탈퇴 상태");

        @Getter
        @Setter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
    //smtp 인증에서 필요
    public Member(String email) {
        this.email = email;
    }
}