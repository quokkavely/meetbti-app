package com.springboot.report.service;

import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.report.entity.Report;
import com.springboot.report.repository.ReportRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReportService {
    private final ReportRepository repository;

    public ReportService(ReportRepository repository) {
        this.repository = repository;
    }

    public Report createReport(Report report) {
        return repository.save(report);
    }

    public Report findReport(Long reportId) {
        return findVerifiedReport(reportId);
    }

    public Page<Report> findReports(int page, int size) {
        return repository.findAll(PageRequest.of(page, size, Sort.Direction.DESC, "reportId"));
    }

    private Report findVerifiedReport(Long reportId) {
        Optional<Report> findReport = repository.findById(reportId);
        return findReport.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REPORT_NOT_FOUND));
    }

}
