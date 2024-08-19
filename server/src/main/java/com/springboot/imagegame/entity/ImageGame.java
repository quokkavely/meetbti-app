package com.springboot.imagegame.entity;

import com.springboot.gamestatus.GameStatus;
import com.springboot.imagegame_comment.entity.ImageGameComment;
import com.springboot.imagegame_result.entity.ImageGameResult;
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
public class ImageGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long gameId;

    @Column
    private String topic;

    @Column
    private String nickName;

    @OneToMany(mappedBy = "game")
    List<ImageGameComment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "game")
    List<Heart> hearts = new ArrayList<>();

    @OneToMany(mappedBy = "game")
    List<ImageGameResult> results = new ArrayList<>();

    @Column
    private GameStatus gameStatus;

    public ImageGame(String topic, String nickName) {
        this.topic = topic;
        this.nickName = nickName;
        gameStatus = GameStatus.PENDING;
    }
}
