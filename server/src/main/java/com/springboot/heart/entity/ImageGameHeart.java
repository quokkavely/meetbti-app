package com.springboot.heart.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.member.entity.Member;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@DiscriminatorValue("IMAGEGAME")
public class ImageGameHeart extends Heart {
    @ManyToOne
    @JoinColumn(name = "IMAGEGAME_ID")
    @JsonManagedReference
    private ImageGame imageGame;

    public ImageGameHeart(Member member, ImageGame imageGame) {
        super();
    }
}