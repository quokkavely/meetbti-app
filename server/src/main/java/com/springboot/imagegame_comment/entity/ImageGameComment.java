package com.springboot.imagegame_comment.entity;

import com.springboot.imagegame.entity.ImageGame;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class ImageGameComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @ManyToOne
    @JoinColumn(name = "gameId")
    private ImageGame game;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @Column
    private String content;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

    public ImageGameComment(ImageGame game, Member member, String content) {
        this.game = game;
        this.member = member;
        this.content = content;
    }
}
