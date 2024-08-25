package com.springboot.report.mapper;

import com.springboot.report.dto.ReportDto;
import com.springboot.report.entity.Report;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReportMapper {
    Report reportPostDtoToReport(ReportDto.PostDto postDto);

//    @Mapping(source = "post.member.nickname", target = "nickname")
//    @Mapping(source = "comment.member.nickname", target = "nickname")
    default ReportDto.ResponseDto reportToReportResponseDto(Report report) {
        if (report == null) {
            return null;
        } else {
            ReportDto.ResponseDto.ResponseDtoBuilder responseDto = ReportDto.ResponseDto.builder();
            if (report.getPost() != null) {
                responseDto.nickname(report.getPost().getMember().getNickname());
                responseDto.reason(report.getReason());
                responseDto.status(report.getStatus());
                responseDto.post(report.getPost());
            } else {
                responseDto.nickname(report.getComment().getMember().getNickname());
                responseDto.reason(report.getReason());
                responseDto.status(report.getStatus());
                responseDto.comment(report.getComment());
            }
            return responseDto.build();
        }
    }


    List<ReportDto.ResponseDto> reportToReportResponseDtos(List<Report> reports);
}
