package com.springboot.auth.handler;

import com.google.gson.Gson;
import com.springboot.exception.SuspendedAccountException;
import com.springboot.exception.WithdrawnAccountException;
import com.springboot.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        log.error("Authenticated failed", exception.getMessage());

        sendErrorResponse(request, response, exception);
    }

    private void sendErrorResponse(HttpServletRequest request,
                                   HttpServletResponse response,
                                   AuthenticationException exception) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse;
        if(exception instanceof WithdrawnAccountException) {
            errorResponse = ErrorResponse.of(HttpStatus.valueOf(HttpStatus.GONE.value()), exception.getMessage());
        } else if (exception instanceof SuspendedAccountException) {
            errorResponse = ErrorResponse.of(HttpStatus.valueOf(HttpStatus.FORBIDDEN.value()), exception.getMessage());
        } else {
            errorResponse = ErrorResponse.of(HttpStatus.valueOf(HttpStatus.UNAUTHORIZED.value()), exception.getMessage());
        }

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(errorResponse.getStatus());
        response.getWriter().write(gson.toJson(errorResponse));
    }
}