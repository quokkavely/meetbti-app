package com.springboot.helper.email;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/send-mail")
@RestController
public class EmailController {
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    //회원가입 이메일 인증코드 발송
    @PostMapping("/email")
    public ResponseEntity sendJoinMail(@RequestBody EmailPostDto emailPostDto) {
        EmailMessage emailMessage = EmailMessage.builder()
                .to(emailPostDto.getEmail())
                .subject("[MeetBTI] 회원가입을 위한 인증코드 발송")
                .build();

        emailService.sendMail(emailMessage,"email");
        String message = "인증코드가 이메일로 발송되었습니다.";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
