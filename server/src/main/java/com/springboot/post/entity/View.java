package com.springboot.post.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class View {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long viewId;

    @JsonManagedReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @JsonManagedReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "POST_ID")
    private Post post;

}
