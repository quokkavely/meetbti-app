package com.springboot.balancegame_result.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BalanceGameResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long resultId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonBackReference("member-balanceresult")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "balanceGameId")
    @JsonBackReference("balancegame-result")
    private BalanceGame balanceGame;


    @Enumerated(value = EnumType.STRING)
    private SelectedOption selectedOption;

    public BalanceGameResult(BalanceGame balanceGame, SelectedOption selectedOption) {
        this.member = member;
        this.balanceGame = balanceGame;
        this.selectedOption = selectedOption;
    }
    public enum SelectedOption{
        L,
        R
        ;
    }
}
