package com.springboot.report.dto;


import com.springboot.report.entity.Report;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ReportResponseDto {
    private Long reportId;
    private Report.ReportReason reason;
    private Report.ReportStatus status;
//    private Long postId;
//    private Long commentId;
}
