package com.springboot.heart.entity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.member.entity.Member;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@DiscriminatorValue("BALANCEGAME")
public class BalanceGameHeart extends Heart {
    @ManyToOne
    @JoinColumn(name = "BALANCEGAME_ID")
    @JsonManagedReference
    private BalanceGame balanceGame;

    public BalanceGameHeart(Member member, BalanceGame balanceGame) {
        super();
    }
}