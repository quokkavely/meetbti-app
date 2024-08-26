package com.springboot.member.controller;

import com.springboot.auth.utils.Principal;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.helper.S3Service;
import com.springboot.helper.email.EmailService;
import com.springboot.helper.email.VerificationDto;
import com.springboot.member.dto.MemberDto;
import com.springboot.member.entity.Member;
import com.springboot.member.mapper.MemberMapper;
import com.springboot.member.service.MemberService;
import com.springboot.response.SingleResponseDto;
import com.springboot.utils.UriCreator;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/members")
@Validated
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final EmailService emailService;
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final RedisTemplate<String, Object> redisTemplate;
    private final S3Service s3Service;

    public MemberController(MemberService memberService, MemberMapper memberMapper, EmailService emailService, RedisTemplate<String, Object> redisTemplate, S3Service s3Service) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
        this.emailService = emailService;
        this.redisTemplate = redisTemplate;
        this.s3Service = s3Service;
    }
    @PostMapping
    public ResponseEntity postMember(@RequestBody @Valid MemberDto.Post postDto) {
        memberService.createMember(memberMapper.memberPostDtoToMember(postDto));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 이메일 인증 창으로 넘어가서 인증코드 입력칸에 인증코드를 입력 후 확인 버튼을 누를때
    @PostMapping("/verify")
    public ResponseEntity registerMember(@Valid @RequestBody VerificationDto verificationDto) {
        URI location = URI.create("");
        if (emailService.verifyEmailCode(verificationDto)) {
            redisTemplate.delete(verificationDto.getEmail()+":auth"); //인증 후 레디스에서 삭제
            Member member = memberService.registerMember(verificationDto);
            location = UriComponentsBuilder
                    .newInstance()
                    .path(MEMBER_DEFAULT_URL + "/{memberId}")
                    .buildAndExpand(member.getMemberId())
                    .toUri();
        }
        return ResponseEntity.created(location).build();
    }
    @PostMapping("/mypage/password")
    public ResponseEntity changePassword(@RequestBody @Valid MemberDto.ChangePw changePwDto,
                                         Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        memberService.updatePassword(
                principal.getMemberId(),
                /*changePwDto.getOldPassword(),*/
                changePwDto.getNewPassword(),
                changePwDto.getConfirmPassword()
        );

        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND);
        }

        String imageUrl = s3Service.uploadFile(file);

        return ResponseEntity.ok(imageUrl);
    }
    @PatchMapping("/mypage")
    public ResponseEntity patchMember(@Valid @RequestBody MemberDto.Patch patchDto,
                                      Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        patchDto.setMemberId(principal.getMemberId());

        Member member = memberService.updateMember(memberMapper.memberPatchDtoToMember(patchDto));

        return new ResponseEntity<>(new SingleResponseDto<>(memberMapper.memberToResponseDto(member)), HttpStatus.OK);

    }
    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickNameDuplicate(@RequestParam String nickName) {
        boolean isDuplicate = memberService.verifiedExistNickname(nickName);
        return ResponseEntity.ok(isDuplicate);
    }
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmailDuplicate(@RequestParam String email) {
        boolean isDuplicate = memberService.verifiedExistEmail(email);
        return ResponseEntity.ok(isDuplicate);
    }
    @GetMapping("/mypage")
    public ResponseEntity getMember(Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Member member = memberService.findMember(principal.getMemberId());

        return new ResponseEntity<>(new SingleResponseDto<>(memberMapper.memberToResponseDto(member)), HttpStatus.OK);
    }
    @DeleteMapping
    public ResponseEntity deleteMember(Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        memberService.deleteMember(principal.getMemberId());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
