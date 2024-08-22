package com.springboot.imagegame_result.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ImageGameResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long resultId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;

    @ManyToOne
    @JoinColumn(name = "IMAGEGAME_ID")
    @JsonBackReference
    private ImageGame imageGame;

    @Enumerated(value = EnumType.STRING)
    private SelectedMbti selectedMbti;

    public ImageGameResult(Member member, ImageGame imageGame, SelectedMbti selectedMbti) {
        this.member = member;
        this.imageGame = imageGame;
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
