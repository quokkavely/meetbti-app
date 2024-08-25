package com.springboot.report.entity;

import com.springboot.comment.entity.Comment;
import com.springboot.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @Enumerated(value = EnumType.STRING)
    private ReportReason reason;

    @Enumerated(value = EnumType.STRING)
    private ReportStatus status = ReportStatus.PENDING;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "COMMENT_ID")
    private Comment comment;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "POST_ID")
    private Post post;

    public enum ReportReason {
        SPAM("광고성게시글 또는 반복 게시물"),
        MISINFORMATION("허위 정보"),
        INAPPROPRIATE("부적절한 컨텐츠"),
        PROFANITY("욕설 또는 저속한언어");

        @Getter
        private String reason;

        ReportReason(String reason) {
            this.reason = reason;
        }
    }
    public enum ReportStatus {
        PENDING("대기중"),
        REVIEW("검토중"),
        ACCEPTED("신고 수락"),
        REJECTED("신고 거절");

        @Getter
        private String status;

        ReportStatus(String status) {
            this.status = status;
        }
    }
}