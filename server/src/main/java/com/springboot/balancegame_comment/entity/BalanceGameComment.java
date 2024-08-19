package com.springboot.balancegame_comment.entity;

import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class BalanceGameComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @ManyToOne
    @JoinColumn(name = "gameId")
    private BalanceGame game;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @Column
    private String content;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

    public BalanceGameComment(BalanceGame game, Member member, String content) {
        this.game = game;
        this.member = member;
        this.content = content;
    }
}
