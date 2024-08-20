package com.v3.config;

import com.springboot.auth.filter.JwtAuthenticationFilter;
import com.springboot.auth.filter.JwtVerifiedFilter;
import com.springboot.auth.handler.*;
import com.springboot.auth.jwt.JwtTokenizer;
import com.springboot.auth.utils.JwtAuthorityUtils;
import com.springboot.member.service.MemberService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

    @Value("${spring.security.oauth2.client.registration.google.clientId}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
    private String clientSecret;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, JwtAuthorityUtils jwtAuthorityUtils, MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.jwtAuthorityUtils = jwtAuthorityUtils;
        this.memberService = memberService;
    }



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)throws Exception{
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
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST,"/*/members").permitAll()
                        .antMatchers(HttpMethod.PATCH,"/*/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET,"/*/members").hasRole("ADMIN")
                        .antMatchers(HttpMethod.GET,"/*/members/**").hasAnyRole("User","ADMIN")
                        .antMatchers(HttpMethod.DELETE,"/*/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST,"/*/post/*/report").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.GET,"/*/reports").hasRole("ADMIN")
                        .antMatchers(HttpMethod.GET,"/*/reports/**").hasRole("ADMIN")
                        // - 관리자가 회원의 부적절한 게시글을 삭제할 수 있다.
                        .anyRequest().permitAll()
                ).oauth2Login(oauth2 ->
                        oauth2.successHandler(
                                new OAuth2MemberSuccessHandler(jwtTokenizer,jwtAuthorityUtils,memberService)) );
        return http.build();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PATCH","DELETE"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer,HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception{
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager,jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/v1/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());
            JwtVerifiedFilter jwtVerifiedFilter = new JwtVerifiedFilter(jwtTokenizer,jwtAuthorityUtils);
            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerifiedFilter,JwtAuthenticationFilter.class)
                    .addFilterAfter(jwtVerifiedFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
        var clientRegistration = clientRegistration();

        return new InMemoryClientRegistrationRepository(clientRegistration);
    }

    private ClientRegistration clientRegistration() {
        return CommonOAuth2Provider
                .GOOGLE
                .getBuilder("google")
                .clientId(clientId)
                .clientSecret(clientSecret)
                .build();
    }

}
