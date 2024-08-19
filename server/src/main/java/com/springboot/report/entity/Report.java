package com.springboot.report.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@Entity
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @Enumerated(value = EnumType.STRING)
    private ReportReason reason;

    @Enumerated(value = EnumType.STRING)
    private ReportStatus status;

    public enum ReportReason {
        SPAMMING("광고성게시글 또는 반복 게시물"),
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