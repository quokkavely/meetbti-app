package com.springboot.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.auth.jwt.JwtTokenizer;
import com.springboot.auth.utils.JwtAuthorityUtils;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.exception.SuspendedAccountException;
import com.springboot.exception.WithdrawnAccountException;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final JwtAuthorityUtils jwtAuthorityUtils;
    private final MemberService memberService;

    public MemberAuthenticationSuccessHandler(JwtTokenizer jwtTokenizer, JwtAuthorityUtils jwtAuthorityUtils, MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.jwtAuthorityUtils = jwtAuthorityUtils;
        this.memberService = memberService;
    }
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        String email = authentication.getName();
        Member member = memberService.findMemberIdByEmail(email);
        long memberId = member.getMemberId();
        List<String> authorities = jwtAuthorityUtils.createRoles(email);

        //탈퇴 회원 login 차단
        if(member.getMemberStatus().equals(Member.MemberStatus.QUIT)) throw new WithdrawnAccountException("Account has been withdrawn");
        if(member.getMemberStatus().equals(Member.MemberStatus.BAN)) throw new SuspendedAccountException("Account has been suspended");


        String accessToken = jwtTokenizer.delegateAccessToken(email, memberId, authorities);
        String refreshToken = jwtTokenizer.delegateRefreshToken(email, accessToken);

        // 헤더에 Authorization 추가
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
        response.setHeader("MemberId", String.valueOf(memberId));

        // 토큰을 클라이언트로 반환
        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(tokens);

        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(jsonResponse);
    }
}