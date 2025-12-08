package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.demo.model.Entry;
import com.example.demo.repo.EntryRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RedisLoadService {

    private final EntryRepo repo;
    private final RedisTemplate<String, String> redis;

    public RedisLoadService(
            EntryRepo repo,
            @Qualifier("redisTemplate") RedisTemplate<String, String> redis) {
        this.repo = repo;
        this.redis = redis;
    }

    public void loadAll() {
        for (Entry e : repo.findAll()) {
            String key = e.getWord().toLowerCase();         
            // String json = """
            //     {
            //         "word_type": "%s",
            //         "definition": "%s"
            //     }
            //     """.formatted(
            //             e.getWordtype(),
            //             e.getDefinition()
            //     );     
            ObjectMapper mapper = new ObjectMapper();

            Map<String, String> m = new HashMap<>();
            m.put("word_type", e.getWordtype());
            m.put("definition", e.getDefinition());

            try {
                String json = mapper.writeValueAsString(m);
                redis.opsForValue().set(key, json);
            } catch (JsonProcessingException ex) {
                throw new RuntimeException(ex);
            }
            // redis.opsForValue().set(key, json);
        }
    }
}
