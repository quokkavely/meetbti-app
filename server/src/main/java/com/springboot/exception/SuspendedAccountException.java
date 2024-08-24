package com.springboot.exception;

import org.springframework.security.core.AuthenticationException;

public class SuspendedAccountException extends AuthenticationException {
    public SuspendedAccountException(String msg) {
        super(msg);
    }
}
