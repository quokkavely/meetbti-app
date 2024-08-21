package com.springboot.heart.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @JsonManagedReference
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Enumerated(EnumType.STRING)
    private ContentType contentType;

    public enum ContentType {
        POST, COMMENT, BALANCE_GAME, IMAGE_GAME
    }

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "POST_ID")
    private Post post;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "COMMENT_ID")
    private Comment comment;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "IMAGEGAME_ID")
    private ImageGame imageGame;


    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "BALANCEGAME_ID")
    private BalanceGame balanceGame;

}
