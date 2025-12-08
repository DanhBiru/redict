package com.example.demo.service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.service.RedisLoadService;

@Component
public class StartupLoader implements CommandLineRunner {

    private final RedisLoadService loader;

    public StartupLoader(RedisLoadService loader) {
        this.loader = loader;
    }

    @Override
    public void run(String... args) {
        loader.loadAll();
    }
}