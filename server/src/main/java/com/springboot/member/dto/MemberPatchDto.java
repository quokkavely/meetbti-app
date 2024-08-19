package com.springboot.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@AllArgsConstructor
public class MemberPatchDto {
    private Long memberId;
    @NotBlank(message = "닉네임은 공백이 아니어야 합니다.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]{2,12}$",
            message = "닉네임은 2~12글자 이내만 가능합니다.")
    private String nickname;
    private String image;

    @NotBlank
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{10,}",
            message = "비밀번호는 대소문자/숫자와 특수기호가 적어도 1개 이상씩 포함된 10자 이상의 비밀번호여야 합니다.")
    private String password;

    @NotBlank(message = "비밀번호 확인은 필수 항목입니다.")
    private String confirmPassword;
}
