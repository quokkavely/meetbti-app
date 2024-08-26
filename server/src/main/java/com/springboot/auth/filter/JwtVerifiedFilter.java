package com.springboot.auth.filter;

import src/main/java/com/springboot/balancegame/controller/BalanceGameController.javacom.springboot.auth.jwt.JwtTokenizer;
import com.springboot.auth.utils.JwtAuthorityUtils;
import com.springboot.auth.utils.Principal;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class JwtVerifiedFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final JwtAuthorityUtils authorityUtils;
    private final RedisTemplate<String, Object> redisTemplate;

    public JwtVerifiedFilter (JwtTokenizer jwtTokenizer, JwtAuthorityUtils authorityUtils, RedisTemplate<String, Object> redisTemplate) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.redisTemplate = redisTemplate;
    }

    @Override
    protected void doFilterInternal (HttpServletRequest request,
                                     HttpServletResponse response,
                                     FilterChain filterChain) throws ServletException, IOException {

        try {
            Map<String,Object> claims = verifyJws(request);
            isTokenValidInRedis(claims);
            setAuthenticationToContext(claims);

        } catch (SignatureException se) {
            request.setAttribute("exception",se);

        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);

        } catch (Exception e){
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);
    }
    private Map<String,Object> verifyJws (HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ","");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws,base64EncodedSecretKey).getBody();
        return claims;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        return authorization == null || !authorization.startsWith("Bearer");
    }

    private void setAuthenticationToContext (Map<String,Object> claims) {

        Integer memberId = (Integer) claims.get("memberId");
        String username = (String) claims.get("username");
        Principal principal = new Principal(memberId, username);

        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal,null,authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    private void isTokenValidInRedis(Map<String, Object> claims) throws IllegalAccessException {
        String username = Optional.ofNullable ((String) claims.get("username")).orElseThrow(()->new NullPointerException("userName is null"));
        Boolean hasKey = redisTemplate.hasKey(username);

        if (Boolean.FALSE.equals(hasKey)) {
            throw new IllegalAccessException("redis key does not exist" + username);
        }
    }
}
