package com.springboot.heart.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.comment.entity.Comment;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.member.entity.Member;
import com.springboot.post.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
@NoArgsConstructor
@Setter
@Getter
@Entity
public class Heart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long heartId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference("member-heart")
    private Member member;

    @Enumerated(EnumType.STRING)
    private ContentType contentType;

    public enum ContentType {
        POST, COMMENT, BALANCE_GAME, IMAGE_GAME
    }

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "POST_ID")
    @JsonBackReference("post-heart")
    private Post post;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "COMMENT_ID")
    @JsonBackReference("comment-heart")
    private Comment comment;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "IMAGEGAME_ID")
    @JsonBackReference("imagegame-heart")
    private ImageGame imageGame;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "BALANCEGAME_ID")
    @JsonBackReference("balancegame-heart")
    private BalanceGame balanceGame;

}
