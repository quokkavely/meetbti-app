package com.springboot.member.service;

import com.springboot.auth.utils.JwtAuthorityUtils;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.helper.email.VerificationDto;
import com.springboot.member.entity.Member;
import com.springboot.member.repository.MemberRepository;
import com.springboot.redis.RedisUtil;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtAuthorityUtils jwtAuthorityUtils;
    private final RedisUtil redisUtil;
    private final RedisTemplate<String, Object> redisTemplate;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtAuthorityUtils jwtAuthorityUtils, RedisUtil redisUtil, RedisTemplate<String, Object> redisTemplate) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtAuthorityUtils = jwtAuthorityUtils;
        this.redisUtil = redisUtil;
        this.redisTemplate = redisTemplate;
    }

    //회원을 생성하는 메서드
    public void createMember(Member member) {
        verifiedExistNickname(member.getNickname());
        verifiedExistEmail(member.getEmail());

        String key = member.getEmail() + ":email";
        redisUtil.setHashValueWithExpire(key, "memberInfo", member, 600);
    }

    //  인증코드 확인 후 회원 등록 여부 결정
    public Member registerMember(VerificationDto verificationDto) {
        String key = verificationDto.getEmail() + ":email";
        Member member = redisUtil.getHashValue(key, "memberInfo", Member.class);
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        //redis에서 member삭제
        redisTemplate.delete(key);
        member.setPassword(passwordEncoder.encode(member.getPassword()));
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
    public void updatePassword(long memberId, /*String oldPassword,*/ String newPassword, String confirmPassword) {
        Member findMember = findMember(memberId);

        if (findMember.getPassword().equals(passwordEncoder.encode(newPassword))) {
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

        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_EXIST);
        }
    }

    //닉네임이 중복되는지 확인하는 메서드
    public Boolean verifiedExistNickname(String nickname) {
        Optional<Member> optionalMember = memberRepository.findByNickname(nickname);

        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_ALREADY_EXIST);
        }

        return false;
    }

    //OAuth2에서 memberId를 반환하는 메서드
    public long findMemberIdByOauth2User(OAuth2User oAuth2User) {
        String email = (String) oAuth2User.getAttributes().get("email");
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isEmpty()) {
            Member newMember = new Member(email);
            newMember.setNickname(generateOAuthMemberNickname());
            Member savedMember = memberRepository.save(newMember);
            return savedMember.getMemberId();
        }
        return member.get().getMemberId();
    }

    public String generateOAuthMemberNickname() {
        String nickname;
        do {
            nickname = RandomStringUtils.randomAlphanumeric(8);
        } while (memberRepository.existsByNickname(nickname));

        return nickname;
    }

    public Long findMemberIdByEmail(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return member.getMemberId();
    }

    public Member registerOAuthMember(String email) {
        Optional<Member> existingMember = memberRepository.findByEmail(email);

        if (existingMember.isPresent()) {
            return existingMember.get(); // 기존 사용자 반환
        }
        Member member = new Member(email);
        member.setNickname(RandomStringUtils.randomAlphanumeric(8));
        return memberRepository.save(member);
    }
}