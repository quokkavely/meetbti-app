package com.springboot.member.controller;

import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/v1/members")
@Validated
public class MemberController {
    private final MemberService service;
    private final MemberMapper mapper;
    private final static String MEMBER_DEFAULT_URL = "/v1/members";

    public MemberController(MemberService service, MemberMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@RequestBody @Valid MemberPostDto postDto) {
        Member member = service.createMember(mapper.memberPostDtoToMember(postDto));
        URI location = UriComponentsBuilder
                .newInstance()
                .path(MEMBER_DEFAULT_URL + "/{memberId}")
                .buildAndExpand(member.getMemberId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{memberId}")
    public ResponseEntity patchMember(@PathVariable("memberId") @Positive long memberId,
                                      @Valid @RequestBody MemberPatchDto patchDto) {
        patchDto.setMemberId(memberId);
        Member member = service.updateMember(mapper.memberPatchDtoToMember(patchDto));
        return new ResponseEntity<>(mapper.memberToResponseDto(member), HttpStatus.OK);

    }

    @GetMapping("/{memberId}")
    public ResponseEntity getMember(@PathVariable("memberId") @Positive Long memberId) {
        Member member = service.findMember(memberId);
        return new ResponseEntity<>(mapper.memberToResponseDto(member),HttpStatus.OK);
    }


    @DeleteMapping("/{memberId}")
    public ResponseEntity deleteMember (@PathVariable @Positive long memberId) {
        service.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}