package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/entries")
public class DictController {

    private final RedisTemplate<String, String> redis;

    public DictController(@Qualifier("redisTemplate") RedisTemplate<String, String> redis) {
        this.redis = redis;
    }

    @CrossOrigin(origins = "http://127.0.0.1:8080")
    @GetMapping("/{word}")
    public ResponseEntity<?> getEntry(@PathVariable String word) {
        String raw = redis.opsForValue().get(word);
        if (raw == null) {
            return ResponseEntity.status(404).body("not found");
        }
        return ResponseEntity.ok(raw);
    }
}
