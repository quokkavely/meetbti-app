package com.springboot.redis;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@RequiredArgsConstructor
@Service
@Slf4j
public class RedisUtil {
    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisTemplate<Long, Object> longObjectRedisTemplate; // Long 타입의 Key를 사용하는 RedisTemplate

    // 해시 데이터 설정 + 만료 시간
    public void setHashValueWithExpire(String key, String hashKey, Object value, long duration) {
        HashOperations<String, String, Object> hashOps = redisTemplate.opsForHash();
        hashOps.put(key, hashKey, value);
        // 만료 시간 설정
        redisTemplate.expire(key, Duration.ofSeconds(duration));
    }

    public <T> T getHashValue(String key, String hashKey, Class<T> clazz) {
        try {
            HashOperations<String, String, Object> hashOps = redisTemplate.opsForHash();
            return clazz.cast(hashOps.get(key, hashKey));
        } catch (Exception e) {
            log.error("Error occurred while retrieving data from Redis. Key: {}, HashKey: {}", key, hashKey, e);
            throw e;  // 예외를 다시 던져서 상위 메서드에서도 처리될 수 있도록 함
        }
    }

    // 문자열 데이터 설정
    public void setDataWithExpire(String key, String value, long duration) {
        ValueOperations<String, Object> valueOps = redisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOps.set(key, value, expireDuration);
    }

    // 문자열 데이터 조회
    public String getData(String key) {
        ValueOperations<String, Object> valueOps = redisTemplate.opsForValue();
        return (String) valueOps.get(key);
    }

    public void setAccessToken(Long memberId, String accessToken, long duration) {
        ValueOperations<String, Object> valueOps = redisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOps.set(String.valueOf(memberId), accessToken, expireDuration);  // Long을 String으로 변환하여 저장
    }

    public String getAccessToken(Long memberId) {
        ValueOperations<String, Object> valueOps = redisTemplate.opsForValue();
        return (String) valueOps.get(String.valueOf(memberId));  // Long을 String으로 변환하여 검색
    }
}
