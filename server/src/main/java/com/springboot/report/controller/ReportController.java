package com.springboot.report.controller;


import com.springboot.report.dto.ReportDto;
import com.springboot.report.entity.Report;
import com.springboot.report.mapper.ReportMapper;
import com.springboot.report.service.ReportService;
import com.springboot.response.MultiResponseDto;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping
@Validated
public class ReportController {
    private final ReportService reportService;
    private final ReportMapper reportMapper;
    private final static String REPORT_DEFAULT_URL = "/reports";

    public ReportController(ReportService reportService, ReportMapper reportMapper) {
        this.reportService = reportService;
        this.reportMapper = reportMapper;
    }

    //게시글 신고버튼
    @PostMapping("/posts/{postId}/reports")
    public ResponseEntity postReport(@PathVariable("postId") @Positive Long postId,
                                         @RequestBody @Valid ReportDto.PostDto postDto,
                                         Authentication authentication) {
        postDto.setPostId(postId);
        Report report = reportService.createReport(reportMapper.reportPostDtoToReport(postDto), authentication, postId, null);
        URI location = UriCreator.createUri(REPORT_DEFAULT_URL, report.getReportId());

        return ResponseEntity.created(location).build();
    }

    // 댓글 신고버튼
    @PostMapping("/comments/{commentId}/reports")
    public ResponseEntity commentReport(@PathVariable("commentId") @Positive Long commentId,
                                        @RequestBody @Valid ReportDto.PostDto postDto,
                                        Authentication authentication) {
        postDto.setCommentId(commentId);
        Report report = reportService.createReport(reportMapper.reportPostDtoToReport(postDto), authentication, null, commentId);
        URI location = UriCreator.createUri(REPORT_DEFAULT_URL, report.getReportId());

        return ResponseEntity.created(location).build();
    }

    //신고 개별 조회
    @GetMapping("/reports/{reportId}")
    public ResponseEntity getReport(@PathVariable("reportId") @Positive Long reportId) {
        Report findReport = reportService.findReport(reportId);
        return new ResponseEntity<>(reportMapper.reportToReportResponseDto(findReport),HttpStatus.OK);
    }


    // 신고내역
    @GetMapping("/reports")
    public ResponseEntity getReports(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size,
                                     @RequestParam(required = false) Report.ReportStatus status,
                                     Authentication authentication) {

        Page<Report> pageReports = reportService.findReports(page -1, size, status);
        List<Report> reports = pageReports.getContent();

        return new ResponseEntity(new MultiResponseDto(reportMapper.reportToReportResponseDtos(reports),pageReports), HttpStatus.OK );
    }

    //게시글 승인시 적용 필요 - 회원 정지 및 해당 content 삭제
    @PatchMapping("/reports/{reportId}")
    public ResponseEntity updateReport(@Positive @PathVariable Long reportId,
                                       @RequestParam String status,
                                       @RequestParam int day,
                                       Authentication authentication) {
        reportService.determineReport(reportId, authentication, day, status);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
