package com.springboot.gamestatus;

public enum GameStatus {
    PENDING("승인 대기 중"),
    ACTIVE("활성 상태")
    ;
    private String description;

    GameStatus(String description) {
        this.description = description;
    }
}
