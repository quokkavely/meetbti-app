package com.springboot.balancegame.entity;

import com.springboot.balancegame_comment.entity.BalanceGameComment;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.gamestatus.GameStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Setter
public class BalanceGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long gameId;

    @Column(updatable = false)
    private String title;

    @Column(updatable = false)
    private String leftOption;

    @Column(updatable = false)
    private String rightOption;

    @Column(updatable = false)
    private String nickname;

    @OneToMany(mappedBy = "game")
    List<BalanceGameComment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "game")
    List<Heart> hearts = new ArrayList<>();

    @OneToMany(mappedBy = "game")
    List<BalanceGameResult> results = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    private GameStatus gameStatus;

    public BalanceGame(String title, String leftOption, String rightOption, String nickname) {
        this.title = title;
        this.leftOption = leftOption;
        this.rightOption = rightOption;
        this.nickname = nickname;
        gameStatus = GameStatus.PENDING;
    }
}
