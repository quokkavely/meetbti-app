package com.springboot.balancegame_result.entity;

import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class BalanceGameResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long resultId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private BalanceGame game;

    @Enumerated(value = EnumType.STRING)
    private SelectedOption selectedOption;

    public BalanceGameResult(Member member, BalanceGame game, SelectedOption selectedOption) {
        this.member = member;
        this.game = game;
        this.selectedOption = selectedOption;
    }

    public enum SelectedOption{
        L,
        R
        ;
    }
}
