package com.springboot.auth.handler;

import com.springboot.auth.jwt.JwtTokenizer;
import com.springboot.auth.utils.JwtAuthorityUtils;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final JwtAuthorityUtils jwtAuthorityUtils;
    private final MemberService memberService;

    public OAuth2MemberSuccessHandler(JwtTokenizer jwtTokenizer, JwtAuthorityUtils jwtAuthorityUtils, MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.jwtAuthorityUtils = jwtAuthorityUtils;
        this.memberService = memberService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        long memberId = memberService.findMemberIdByOauth2User(oAuth2User);
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        List<String> authorities = jwtAuthorityUtils.createRoles(email);
        saveMember(email);
        redirect(request, response, email, memberId, authorities);
    }

    private void saveMember(String email) {
        Member member = new Member(email);
        memberService.createMember(member);
    }

    private void redirect(HttpServletRequest request,
                          HttpServletResponse response,
                          String username,
                          long memberId,
                          List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(username, memberId, authorities);
        String refreshToken = delegateRefreshToken(username);
        String uri = createURI(accessToken,refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(String username, long memberId, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", memberId);
        claims.put("roles", authorities);

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("accessToken", accessToken);
        queryParams.add("refreshToken", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
//                .port(80)
                .path("/receive-token.html")
                .queryParams(queryParams)
                .build()
                .toUri();
    }


}
