package com.springboot.balancegame.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.balancegame_comment.entity.BalanceGameComment;
import com.springboot.balancegame_result.entity.BalanceGameResult;
import com.springboot.gamestatus.GameStatus;
import com.springboot.heart.entity.Heart;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Setter
public class BalanceGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long balanceGameId;

    @Column(updatable = false)
    private String title;

    @Column(updatable = false)
    private String leftOption;

    @Column(updatable = false)
    private String rightOption;

    @Column(updatable = false)
    private String nickname;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "balanceGame")
    @JsonManagedReference("balancegame-comment")
    List<BalanceGameComment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "balanceGame")
    @JsonManagedReference("balancegame-heart")
    List<Heart> hearts = new ArrayList<>();

    @OneToMany(mappedBy = "balanceGame")
    @JsonManagedReference("balancegame-result")
    List<BalanceGameResult> results = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    private GameStatus gameStatus = GameStatus.PENDING;

    public BalanceGame(String title, String leftOption, String rightOption, String nickname) {
        this.title = title;
        this.leftOption = leftOption;
        this.rightOption = rightOption;
        this.nickname = nickname;
    }
}
