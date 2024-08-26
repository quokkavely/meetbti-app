package com.springboot.report.dto;

import com.springboot.comment.entity.Comment;
import com.springboot.post.entity.Post;
import com.springboot.report.entity.Report;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;


public class ReportDto {

    @Getter
    @AllArgsConstructor
    @Builder
    @Setter
    public static class PostDto {
        private Long postId;
        private Long commentId;
        @NotNull
        private Report.ReportReason reason;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class ResponseDto {
        private String nickname; //피신고자의 닉네임
        private Report.ReportReason reason;
        private Report.ReportStatus status;
        private Post post;
        private Comment comment;
        private long reportId;
    }

}