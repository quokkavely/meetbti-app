package com.springboot.imagegame_comment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ImageGameComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference("member-imagecomment")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "IMAGEGAME_ID")
    @JsonBackReference("imagegame-comment")
    private ImageGame imageGame;

    @Column
    private String content;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

    public ImageGameComment(ImageGame imageGame, Member member, String content) {
        this.imageGame = imageGame;
        this.member = member;
        this.content = content;
    }

    public void setImageGame(ImageGame game) {
        imageGame = game;
        if(!game.getComments().contains(this)){
            game.addComment(this);
        }
    }
}
