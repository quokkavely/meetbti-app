package com.springboot.auth.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class LoginDto {
    private String username;
    @NotNull
    private String password;
}
