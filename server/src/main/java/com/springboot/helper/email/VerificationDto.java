package com.springboot.helper.email;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Email;

@Getter
@RequiredArgsConstructor
public class VerificationDto {
    @Email
    private String email;
    private String authCode;
}

