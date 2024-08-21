package com.springboot.exception;

import lombok.Getter;

public enum ExceptionCode {
    PASSWORD_MISMATCH(400,"Invalid Password"),
    CONFIRM_PASSWORD_MISMATCH(400,"Passwords Do Not Match"),
    ACCESS_DENIED(403,"Access Denied"),
    MEMBER_NOT_FOUND(404,"Member_Not_Found"),
    POST_NOT_FOUND(404,"Post Not Found"),
    COMMENT_NOT_FOUND(404,"Comment Not Found"),
    TESTRESULT_NOT_FOUND(404,"Testresult Not Found"),
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
