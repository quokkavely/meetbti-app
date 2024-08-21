package com.springboot.imagegame.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.gamestatus.GameStatus;
import com.springboot.heart.entity.ImageGameHeart;
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
    private long imageGameId;

    @Column
    private String topic;

    @Column
    private String nickName;

    @OneToMany(mappedBy = "imageGame")
    @JsonBackReference
    List<ImageGameComment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "imageGame")
    @JsonBackReference
    List<ImageGameHeart> hearts = new ArrayList<>();

    @OneToMany(mappedBy = "imageGame")
    @JsonBackReference
    List<ImageGameResult> results = new ArrayList<>();

    @Column
    private GameStatus gameStatus = GameStatus.PENDING;

    public ImageGame(String topic, String nickName) {
        this.topic = topic;
        this.nickName = nickName;
    }
}
