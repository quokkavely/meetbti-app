package com.springboot.imagegame_result.entity;

import com.springboot.imagegame.entity.ImageGame;
import com.springboot.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ImageGameResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long resultId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private ImageGame game;

    @Enumerated(value = EnumType.STRING)
    private SelectedMbti selectedMbti;

    public ImageGameResult(Member member, ImageGame game, SelectedMbti selectedMbti) {
        this.member = member;
        this.game = game;
        this.selectedMbti = selectedMbti;
    }

    public enum SelectedMbti {
        ISTJ,
        ISFJ,
        INFJ,
        INTJ,
        ISTP,
        ISFP,
        INFP,
        INTP,
        ESTP,
        ESFP,
        ENFP,
        ENTP,
        ESTJ,
        ESFJ,
        ENFJ,
        ENTJ
    }
}
