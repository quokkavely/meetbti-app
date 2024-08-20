package com.springboot.post.entity;

import com.springboot.comment.entity.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long PostId;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false, length = 4)
    private String category;

    @Column
    private String image;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private PostStatus postStatus = PostStatus.POST_REGISTERED;

    @Column(nullable = false)
    private long viewCount = 0;

    @OneToOne(mappedBy = "post",cascade = CascadeType.REMOVE)
    private Comment comment;
    public enum PostStatus {
        POST_REGISTERED("등록 상태"),
        POST_DELETED("삭제 상태");

        @Getter
        @Setter
        private String status;

        PostStatus(String status) {
            this.status = status;
        }
    }
}
