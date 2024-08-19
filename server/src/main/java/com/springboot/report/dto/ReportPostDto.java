package com.springboot.report.dto;

import com.springboot.report.entity.Report;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class ReportPostDto {
    @NotNull
    private Report.ReportReason reason;
}
