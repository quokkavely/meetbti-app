package com.springboot.member.service;

import com.springboot.auth.utils.JwtAuthorityUtils;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.entity.Member;
import com.springboot.member.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtAuthorityUtils jwtAuthorityUtils;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtAuthorityUtils jwtAuthorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtAuthorityUtils = jwtAuthorityUtils;
    }
    //회원을 생성하는 메서드
    public Member createMember(Member member) {
        verifiedExistEmail(member.getEmail());
        verifiedExistNickname(member.getNickname());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = jwtAuthorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }
    //회원 정보를 수정하는 메서드
    public Member updateMember(Member member) {

        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getNickname())
                .ifPresent(findMember::setNickname);

        Optional.ofNullable(member.getImage())
                .ifPresent(findMember::setImage);

    return memberRepository.save(findMember);
    }
    //회원 비밀번호를 수정하는 메서드
    public void updatePassword (long memberId,String oldPassword,String newPassword,String confirmPassword) {
        Member findMember = findMember(memberId);

        if (!findMember.getPassword().equals(passwordEncoder.encode(oldPassword))) {
            throw new BusinessLogicException(ExceptionCode.PASSWORD_MISMATCH);
        }
        if (!newPassword.equals(confirmPassword)) {
            throw new BusinessLogicException(ExceptionCode.CONFIRM_PASSWORD_MISMATCH);
        }
        findMember.setPassword(passwordEncoder.encode(newPassword));

        memberRepository.save(findMember);
    }
    //회원 정보를 찾는 메서드
    public Member findMember(long memberId) {
       return findVerifiedMember(memberId);
    }
    //회원을 삭제하는 메서드
    public void deleteMember(long memberId) {
        Member member = findMember(memberId);

        member.setMemberStatus(Member.MemberStatus.QUIT);

        memberRepository.save(member);
    }
    //memerId를 통해 회원이 DB에 존재하는지 확인하는 메서드
    private Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        return optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    //email을 통해 회원이 DB에 존재하는지 확인하는 메서드
    private void verifiedExistEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if(optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_EXIST);
        }
    }

    //닉네임이 중복되는지 확인하는 메서드
    public Boolean verifiedExistNickname(String nickname) {
        Optional<Member> optionalMember = memberRepository.findByNickname(nickname);

        if(optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_ALREADY_EXIST);
        }

        return false;
    }

}
