package com.springboot.auth.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Principal {
    private long memberId;
    private String username;

    public String getName() {
        return this.username;
    }
}
