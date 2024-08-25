package com.springboot.config;

import com.springboot.auth.filter.JwtAuthenticationFilter;
import com.springboot.auth.filter.JwtVerifiedFilter;
import com.springboot.auth.handler.*;
import com.springboot.auth.jwt.JwtTokenizer;
import com.springboot.auth.utils.JwtAuthorityUtils;
import com.springboot.member.service.MemberService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final JwtAuthorityUtils jwtAuthorityUtils;
    private final MemberService memberService;
    private final RedisTemplate<String, Object> redisTemplate;

    @Value("${spring.security.oauth2.client.registration.google.clientId}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
    private String clientSecret;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, JwtAuthorityUtils jwtAuthorityUtils, MemberService memberService, RedisTemplate<String, Object> redisTemplate) {
        this.jwtTokenizer = jwtTokenizer;
        this.jwtAuthorityUtils = jwtAuthorityUtils;
        this.memberService = memberService;
        this.redisTemplate = redisTemplate;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET,"/h2").permitAll()
                        .antMatchers(HttpMethod.POST,"/h2/**").permitAll()
                        .antMatchers(HttpMethod.GET,"/h2/**").permitAll()
                        .antMatchers(HttpMethod.POST,"/*/signup").permitAll()
                        .antMatchers(HttpMethod.POST,"/*/verify").permitAll()
                        .antMatchers(HttpMethod.POST, "/login").permitAll()
                        .antMatchers(HttpMethod.GET,"/questions").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.POST,"/*/members").permitAll()
                        .antMatchers(HttpMethod.PATCH,"/*/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET,"/*/members/**").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.DELETE,"/*/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST,"/*/post/*/report").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.POST,"/*/comments/*/report").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.GET,"/*/reports").hasRole("ADMIN")
                        .antMatchers(HttpMethod.GET,"/*/reports/**").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PATCH,"/*/reports/**").hasRole("ADMIN")

                        // - 관리자가 회원의 부적절한 게시글을 삭제할 수 있다.
                        .anyRequest().permitAll()
                ).oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer,jwtAuthorityUtils,memberService)))
                .apply(new CustomFilterConfigurer());
        return http.build();
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PATCH","DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setExposedHeaders(Arrays.asList("Authorization","MemberId"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer,HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception{
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager,jwtTokenizer);

            jwtAuthenticationFilter.setFilterProcessesUrl("/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler(jwtTokenizer, jwtAuthorityUtils, memberService));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerifiedFilter jwtVerifiedFilter = new JwtVerifiedFilter(jwtTokenizer, jwtAuthorityUtils, redisTemplate);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerifiedFilter,JwtAuthenticationFilter.class)
                    .addFilterAfter(jwtVerifiedFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
