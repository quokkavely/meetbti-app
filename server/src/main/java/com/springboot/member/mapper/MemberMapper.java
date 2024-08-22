package com.springboot.member.mapper;

import com.springboot.member.dto.MemberDto;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post postDto);
    Member memberPatchDtoToMember(MemberDto.Patch patchDto);
    default MemberDto.Response memberToResponseDto(Member member) {
        MemberDto.Response.ResponseBuilder response = MemberDto.Response.builder();
            response.nickname(member.getNickname());
            response.image(member.getImage());
            response.mbti(member.getTestResults().get(member.getTestResults().size() - 1).getMbti());
            return response.build();
    }
    List<MemberDto.Response> membersToResponseDto(List<Member> members);
}

