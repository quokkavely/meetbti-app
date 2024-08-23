package com.springboot.helper.email;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class VerificationDto {
    private String email;
    private String authCode;
}

