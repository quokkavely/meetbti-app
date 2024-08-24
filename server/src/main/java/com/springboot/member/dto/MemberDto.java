package com.springboot.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberDto {
    @Builder
    @Getter
    public static class Post {
        @NotBlank
        @Email
        private String email;

        @NotBlank(message = "닉네임은 공백이 아니어야 합니다.")
        @Pattern(regexp = "^[a-zA-Z0-9가-힣]{2,10}$",
                message = "닉네임은 2~10글자 이내만 가능합니다.")
        private String nickname;

        @NotBlank
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{10,20}",
                message = "비밀번호는 대소문자/숫자와 특수기호가 적어도 1개 이상씩 포함된 10자 이상의 비밀번호여야 합니다.")
        private String password;
    }
    @Builder
    @Getter
    @Setter
    public static class Patch {
        private long memberId;
        private String image;

        @Pattern(regexp = "^[a-zA-Z0-9가-힣]{2,12}$",
                message = "닉네임은 2~10글자 이내만 가능합니다.")
        private String nickname;
    }
    @Builder
    @Getter
    public static class Response {
        private String image;
        private String nickname;
        private String mbti;
    }
    @Builder
    @Getter
    public static class ChangePw {
        /*@NotBlank
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{10,}",
                message = "비밀번호는 대소문자/숫자와 특수기호가 적어도 1개 이상씩 포함된 10자 이상의 비밀번호여야 합니다.")
        private String oldPassword;*/

        @NotBlank
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{10,}",
                message = "비밀번호는 대소문자/숫자와 특수기호가 적어도 1개 이상씩 포함된 10자 이상의 비밀번호여야 합니다.")
        private String newPassword;

        @NotBlank(message = "비밀번호 확인은 필수 항목입니다.")
        private String confirmPassword;
    }
}
