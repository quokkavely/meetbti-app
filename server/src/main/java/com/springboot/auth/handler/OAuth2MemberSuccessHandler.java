package com.springboot.auth.handler;

import com.springboot.auth.jwt.JwtTokenizer;
import com.springboot.auth.utils.JwtAuthorityUtils;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
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
        String email;
        long memberId = 0;
        if (authentication.getPrincipal() instanceof OAuth2User) {
            // OAuth2 로그인
            var oAuth2User = (OAuth2User) authentication.getPrincipal();
            email = String.valueOf(((OAuth2User) authentication.getPrincipal()).getAttributes().get("email"));
            memberId = memberService.findMemberIdByOauth2User(oAuth2User);
            memberService.registerOAuthMember(email);
        } else {
            // 자체 로그인
            var userDetails = (UserDetails) authentication.getPrincipal();
            email = userDetails.getUsername(); // UserDetails에서 username(email)을 가져옴
            memberId = memberService.findMemberIdByEmail(email);
        }

        List<String> authorities = jwtAuthorityUtils.createRoles(email);

        String accessToken = jwtTokenizer.delegateAccessToken(email, memberId, authorities);
        String refreshToken = jwtTokenizer.delegateRefreshToken(email, accessToken);

        // Debugging logs
        System.out.println("Access Token: " + accessToken);
        System.out.println("Refresh Token: " + refreshToken);

        // 클라이언트로 토큰을 보내기 위해 리다이렉트
        String uri = createURI(accessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("accessToken", accessToken);
        queryParams.add("refreshToken", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .path("/receive-token.html")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
