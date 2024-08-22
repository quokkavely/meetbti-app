package com.springboot.report.controller;

import com.springboot.report.dto.ReportPostDto;
import com.springboot.report.entity.Report;
import com.springboot.report.mapper.ReportMapper;
import com.springboot.report.service.ReportService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping
@Validated
public class ReportController {
    private final ReportService service;
    private final ReportMapper mapper;

    public ReportController(ReportService service, ReportMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }


    @PostMapping("/posts/{postId}/report")
    public ResponseEntity postPostReport(@PathVariable("postId") @Positive Long postId,
                                         @RequestBody @Valid ReportPostDto postDto) {
        Report report = service.createReport(mapper.reportPostDtoToReport(postDto));
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path("/{reportId}")
                .buildAndExpand(report.getReportId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PostMapping("/comments/{commentId}/report")
    public ResponseEntity postCommentReport(@PathVariable("commentId") @Positive Long commentId,
                                            @RequestBody @Valid ReportPostDto postDto) {
        Report report = service.createReport(mapper.reportPostDtoToReport(postDto));
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path("/{reportId}")
                .buildAndExpand(report.getReportId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/reports/{reportId}")
    public ResponseEntity getReport(@PathVariable("reportId") @Positive Long reportId) {
        Report findReport = service.findReport(reportId);
        return new ResponseEntity<>(mapper.reportToReportResponseDto(findReport),HttpStatus.OK);
    }

    @GetMapping("/reports")
    public ResponseEntity<List<Report>> getReports(@Positive @RequestParam int page,
                                                   @Positive@RequestParam int size) {
        Page<Report> pageReports = service.findReports(page, size);
        List<Report> reports = pageReports.getContent();

        return new ResponseEntity(reports, HttpStatus.OK );
    }

}
