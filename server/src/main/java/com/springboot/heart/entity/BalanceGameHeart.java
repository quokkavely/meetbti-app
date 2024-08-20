package com.springboot.heart.entity;
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
    private BalanceGame balanceGame;

    public BalanceGameHeart(Member member, BalanceGame balanceGame) {
        super();
    }
}