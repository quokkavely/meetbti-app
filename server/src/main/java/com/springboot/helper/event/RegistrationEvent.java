package com.springboot.helper.event;

import com.springboot.member.entity.Member;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class RegistrationEvent {
    private final Member member;

    public RegistrationEvent(Member member) {
        this.member = member;
    }
}
