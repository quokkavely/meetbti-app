package com.springboot.heart.entity;

import com.springboot.member.entity.Member;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@DiscriminatorValue("COMMENT")
public class CommentHeart extends Heart {

    @ManyToOne
    @JoinColumn(name = "COMMENT_ID")
    private Comment comment;

    public CommentHeart(Member member, Comment comment) {
        super();
    }
}