package com.springboot.heart.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "HEART_TYPE")
public abstract class Heart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long heartId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonManagedReference
    private Member member;

//    public void addMember(Member member) {
//        this.member = member;
//        if (member != null && !member.getHearts().contains(this)) {
//            member.getHearts().add(this);
//        }
//    }
}



