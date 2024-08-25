package com.springboot.helper.event;

import com.springboot.helper.email.EmailMessage;
import com.springboot.helper.email.EmailService;
import com.springboot.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.mail.MailSendException;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

@Component
@EnableAsync
@Slf4j
public class MemberRegisterEventHandler {
    private final EmailService emailService;
    private final MemberService memberService;

    public MemberRegisterEventHandler(EmailService emailService, MemberService memberService) {
        this.emailService = emailService;
        this.memberService = memberService;
    }
    @EventListener
    public void listen(RegistrationEvent event) {
        try{
            EmailMessage emailMessage = EmailMessage.builder()
                    .to(event.getMember().getEmail())
                    .subject("[MeetBTI] 회원가입을 위한 인증코드 발송")
                    .build();
            emailService.sendMail(emailMessage,"email");

        } catch (MailSendException e) {
             log.error("MailSendException");
        } catch (RuntimeException e) {
            log.error("RuntimeException : while sending");
        }
    }
}
