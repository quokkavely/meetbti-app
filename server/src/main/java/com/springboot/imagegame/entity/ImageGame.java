package com.springboot.imagegame.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.gamestatus.GameStatus;
import com.springboot.heart.entity.Heart;
import com.springboot.imagegame_comment.entity.ImageGameComment;
import com.springboot.imagegame_result.entity.ImageGameResult;
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
public class ImageGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageGameId;

    @Column(nullable = false)
    private String topic;

    @Column(nullable = false, length = 10)
    private String nickName;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "imageGame")
    @JsonManagedReference("imagegame-comment")
    List<ImageGameComment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "imageGame")
    @JsonManagedReference("imagegame-heart")
    List<Heart> hearts = new ArrayList<>();

    @OneToMany(mappedBy = "imageGame")
    @JsonManagedReference("imagegame-result")
    List<ImageGameResult> results = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    private GameStatus gameStatus = GameStatus.PENDING;

    public ImageGame(String topic, String nickName) {
        this.topic = topic;
        this.nickName = nickName;
    }
    public void addComment(ImageGameComment comment) {
        comments.add(comment);
        if(comment.getImageGame() == null){
            comment.setImageGame(this);
        }
    }
}
