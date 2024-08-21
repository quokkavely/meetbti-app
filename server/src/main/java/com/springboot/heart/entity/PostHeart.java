package com.springboot.heart.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.member.entity.Member;
import com.springboot.post.entity.Post;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@DiscriminatorValue("POST")
public class PostHeart extends Heart {
    @ManyToOne
    @JoinColumn(name = "POST_ID")
    @JsonManagedReference
    private Post post;

    public PostHeart(Member member, Post post) {
        super();
    }
}