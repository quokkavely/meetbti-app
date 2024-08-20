package com.springboot.helper.email;


import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Slf4j
@Service

public class EmailService {
    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

    public EmailService(JavaMailSender javaMailSender, SpringTemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    public String sendMail(EmailMessage emailMessage, String type) {
        String authNumber = createCode();
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        //if(type.equals("password")) memberService.setTempPassword(emailMessage.getTo(),authNumber);
        // - type이 비밀먼호와 일치하는 경우 authNumber = 임시비밀번호로 사용된다.
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,false,"UTF-8");
            mimeMessageHelper.setTo(emailMessage.getTo());
            mimeMessageHelper.setSubject(emailMessage.getSubject());
            mimeMessageHelper.setText(setContext(authNumber,type), true);
            javaMailSender.send(mimeMessage);
            log.info("Success");
            return authNumber;

        } catch (MessagingException e) {
            log.info("fail");
            throw new RuntimeException(e);
        }
    }

    // 이메일 인증코드 생성
    public String createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();
        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0:
                    key.append((char) (random.nextInt(26) + 'a'));
                    break;
                case 1:
                    key.append((char) (random.nextInt(26) + 'A'));
                    break;
                case 2:
                    key.append(random.nextInt(10)); // 0부터 9까지
                    break;
            }
        }
        return key.toString();
    }

    public String setContext(String code, String type) {
        Context context = new Context();
        context.setVariable("code", code);
        return templateEngine.process(type, context);
    }
}
