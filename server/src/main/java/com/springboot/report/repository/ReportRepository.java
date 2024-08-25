package com.springboot.report.repository;

import com.springboot.report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository <Report, Long> {

    boolean existsByPost_PostIdAndStatusNot(Long postId, Report.ReportStatus reportStatus);
    boolean existsByComment_CommentIdAndStatusNot(Long commentId, Report.ReportStatus reportStatus);
    boolean existsByPost_PostId(Long postId);
    boolean existsByComment_CommentId(Long commentId);
}
