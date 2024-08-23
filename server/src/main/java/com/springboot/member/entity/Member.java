package com.springboot.member.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @Column(length = 100)
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

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany (mappedBy = "member")
    @JsonManagedReference("member-heart")
    private List<Heart> hearts = new ArrayList<>();

    @OneToMany (mappedBy = "member")
    @JsonManagedReference("member-testresult")
    private List<TestResult> testResults = new ArrayList<>();

    @OneToMany (mappedBy = "member")
    @JsonManagedReference("member-post")
    private List<Post> posts = new ArrayList<>();

    @OneToMany (mappedBy = "member")
    @JsonManagedReference("member-comment")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany (mappedBy = "member")
    @JsonManagedReference("member-imagecomment")
    private List<ImageGameComment> imageComments = new ArrayList<>();

    @OneToMany (mappedBy = "member")
    @JsonManagedReference("member-balancecomment")
    private List<BalanceGameComment> balanceComments = new ArrayList<>();

    @OneToMany (mappedBy = "member")
    @JsonManagedReference("member-balanceresult")
    private List<BalanceGameResult> balanceGameResults = new ArrayList<>();

    @OneToMany (mappedBy = "member")
    @JsonManagedReference("member-imageresult")
    private List<ImageGameResult> imageResults = new ArrayList<>();

    public enum MemberStatus {
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