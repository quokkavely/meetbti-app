package com.springboot.report.mapper;

import com.springboot.report.dto.ReportPostDto;
import com.springboot.report.dto.ReportResponseDto;
import com.springboot.report.entity.Report;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReportMapper {

//    @Mapping(source = "postId", target = "post.postId")
//    @Mapping(source = "commentId", target = "comment.commentId")
    Report reportPostDtoToReport(ReportPostDto postDto);

//    @Mapping(source = "post.postId", target = "postId")
//    @Mapping(source = "comment.commentId", target = "commentId")
    ReportResponseDto reportToReportResponseDto(Report report);
    List<ReportResponseDto> reportToReportResponseDtos(List<Report> reports);
}
