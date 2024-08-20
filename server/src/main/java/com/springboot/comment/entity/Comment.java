package com.springboot.comment.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.post.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(nullable = false)
    private String content;

    @JsonManagedReference
    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "POST_ID")
    private Post post;
}
