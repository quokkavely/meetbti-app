package com.springboot.report.service;

import com.springboot.comment.service.CommentService;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.entity.Member;
import com.springboot.post.entity.Post;
import com.springboot.comment.entity.Comment;
import com.springboot.post.service.PostService;
import com.springboot.report.entity.Report;
import com.springboot.report.repository.ReportRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final PostService postService;
    private final CommentService commentService;

    public ReportService(ReportRepository reportRepository, PostService postService, CommentService commentService) {
        this.reportRepository = reportRepository;
        this.postService = postService;
        this.commentService = commentService;
    }


    // 사용자가 게시글의 신고버튼 눌렀을 때 로직
    public Report createReport(Report report, Authentication authentication, Long postId, Long commentId) {
        Post post = null;
        Comment comment = null;

        if (postId != null) {
            post = postService.findPost(postId, authentication);
        } else if (commentId != null) {
            comment = commentService.findComment(commentId);
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_REPORT_TARGET);
        }

        verifyExistingReports(postId, commentId);
        associateReportWithContent(report, post, comment);

        return reportRepository.save(report);
    }

    //관리자가 신고된 게시글, 댓글을 개별 조회 할때
    public Report findReport(Long reportId) {
        return findVerifiedReport(reportId);
    }

    //신고글 대해 관리자가 승인을 눌렀을 때 로직.
    @Transactional
    public Report approveReport(Long reportId, Authentication authentication) {
        // 회원상태 변경 -계정 정지 기간 7일로 설정. 신고되었을때 @Scheduled 사용해서 처리.
        // 승인 되었을때는 게시글의 상태가 변경되어야 함.
        Report report = findVerifiedReport(reportId);
        //게시글 신고처리
        if (report.getPost() != null) {
            report.getPost().getMember().setMemberStatus(Member.MemberStatus.BAN);
            report.getPost().setPostStatus(Post.PostStatus.DELETED);
        // 댓글 신고처리
        } else if (report.getComment() != null) {
            report.getComment().getMember().setMemberStatus(Member.MemberStatus.BAN);
            commentService.deleteComment(report.getComment().getCommentId(), authentication);
            report.setComment(null);
        }
        report.setStatus(Report.ReportStatus.ACCEPTED);
        return reportRepository.save(report);

    }

    public Page<Report> findReports(int page, int size) {
        return reportRepository.findAll(PageRequest.of(page, size, Sort.Direction.DESC, "reportId"));
    }

    private Report findVerifiedReport(Long reportId) {
        Optional<Report> findReport = reportRepository.findById(reportId);
        return findReport.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REPORT_NOT_FOUND));
    }

    //컨텐츠에 신고 내역 유무 확인
    private boolean doesReportExist(Long postId, Long commentId) {
        if (postId != null) {
            return reportRepository.existsByPost_PostId(postId);
        } else if (commentId != null) {
            return reportRepository.existsByComment_CommentId(commentId);
        }
        return false;
    }
    //컨텐츠에 신고 상태를 확인
    private boolean doesNonRejectedReportExist(Long postId, Long commentId) {
        //이미 신고내역이 있는지 찾는 것 (대기중, 검토중) 일 경우 이미 신고된 컨텐츠 입니다.
        //만약에 신고거절 상태였을때는 신고 못하게 막기."이 컨텐츠에 대한 신고는 이미 거절되었습니다. 추가 정보가 있는 경우 다른 사유로 신고해 주세요."
        //true -신고거절 이력 없음, false-신고 거절 이력 있음
            if (postId != null) {
                return reportRepository.existsByPost_PostIdAndStatusNot(postId, Report.ReportStatus.REJECTED);
            } else if (commentId != null) {
                return reportRepository.existsByComment_CommentIdAndStatusNot(commentId, Report.ReportStatus.REJECTED);
            }
            return false;
    }

    private void verifyExistingReports(Long postId, Long commentId) {
        if(!doesReportExist(postId, commentId)) { //신고내역 없을 때 > 신고가능
            return;
        } else if (doesNonRejectedReportExist(postId, commentId)) { // 신고 내역 있고 거절된 내역 없을 때 > 이미 신고된 게시글이다
            throw new BusinessLogicException(ExceptionCode.REPORT_ALREADY_EXISTS);
        }
    }

    //report 에 content 적용해서 신고하기.
    private void associateReportWithContent(Report report, Post post, Comment comment) {
        if(post != null ) {
            report.setPost(post);
        } else {
            report.setComment(comment);
        }
    }
}