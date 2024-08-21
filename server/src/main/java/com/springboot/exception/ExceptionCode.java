package com.springboot.exception;

import lombok.Getter;

public enum ExceptionCode {
    PASSWORD_MISMATCH(400,"Invalid Password"),
    CONFIRM_PASSWORD_MISMATCH(400,"Passwords Do Not Match"),
    ACCESS_DENIED(403,"Access Denied"),
    MEMBER_NOT_FOUND(404,"Member Not Found"),
    POST_NOT_FOUND(404,"Post Not Found"),
    COMMENT_NOT_FOUND(404,"Comment Not Found"),
    TEST_RESULT_NOT_FOUND(404,"TestResult Not Found"),
    GAME_NOT_FOUND(404,"Game Not Found"),
    EMAIL_ALREADY_EXIST(409, "Email Already Exist"),
    NICKNAME_ALREADY_EXIST(409, "Nickname Already Exist");

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode (int status, String message) {
        this.status = status;
        this.message = message;
    }
}
