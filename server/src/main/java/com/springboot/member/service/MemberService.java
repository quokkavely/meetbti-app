package com.springboot.member.service;

import com.springboot.member.entity.Member;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository repository;

    public MemberService(MemberRepository repository) {
        this.repository = repository;
    }

    public Member createMember(Member member) {
        verifiedExistNickname(member.getNickname());
        verifiedExistEmail(member.getEmail());

        return repository.save(member);
    }

    public Member updateMember(Member member) {

        //수정할 수 있는 값. memberStatus. nickname, password, image
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getNickname())
                .ifPresent(findMember::setNickname);

        Optional.ofNullable(member.getImage())
                .ifPresent(findMember::setImage);

        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(findMember::setMemberStatus);

        Optional.ofNullable(member.getPassword())
                .ifPresent(findMember::setPassword);

        return repository.save(findMember);
    }

    public Member findMember(Long memberId) {
        return findVerifiedMember(memberId);
    }

    public void deleteMember(Long memberId) {
        repository.delete(findVerifiedMember(memberId));
        //회원탈퇴는 상태만 수정할건지? DB에서 삭제할건지?
    }

    private Member findVerifiedMember(Long memberId) {
        Optional<Member> optionalMember = repository.findById(memberId);
        return optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    // 이메일 검증
    private void verifiedExistEmail(String email) {
        Optional<Member> optionalMember = repository.findByEmail(email);
        if(optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_EXIST);
        }

    }

    // 닉네임 검증
    private void verifiedExistNickname(String nickname) {
        Optional<Member> optionalMember = repository.findByNickname(nickname);
        if(optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_ALREADY_EXIST);
        }

    }