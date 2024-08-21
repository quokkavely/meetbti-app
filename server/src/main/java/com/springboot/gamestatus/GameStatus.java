package com.springboot.gamestatus;

import lombok.Getter;

public enum GameStatus {
    PENDING("승인 대기 중"),
    ACTIVE("활성 상태");
    @Getter
    private String status;

    GameStatus(String status) {
        this.status = status;
    }
}
