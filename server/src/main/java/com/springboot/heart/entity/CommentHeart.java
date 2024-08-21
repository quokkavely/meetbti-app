package com.springboot.heart.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.comment.entity.Comment;
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
    @JsonManagedReference
    private Comment comment;

    public CommentHeart(Member member, Comment comment) {
        super();
    }
}