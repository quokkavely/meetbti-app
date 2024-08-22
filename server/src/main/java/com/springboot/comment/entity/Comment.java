package com.springboot.comment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.heart.entity.Heart;
import com.springboot.member.entity.Member;
import com.springboot.post.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(nullable = false)
    private String content;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference("member-comment")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    @JsonBackReference("post-comment")
    private Post post;

    @OneToMany(mappedBy = "comment")
    @JsonManagedReference("comment-heart")
    private List<Heart> hearts = new ArrayList<>();

}
