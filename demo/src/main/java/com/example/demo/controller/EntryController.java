package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Entry;
import com.example.demo.repo.EntryRepo;

import java.util.List;

@RestController
@RequestMapping("/api/entries/debug")
public class EntryController {
    private final EntryRepo repo;

    public EntryController(EntryRepo repo) {
        this.repo = repo;
    }
    
    @CrossOrigin(origins = "http://127.0.0.1:8080")
    @GetMapping("/{word}")
    public List<Entry> get(@PathVariable String word) {
        return repo.findByWord(word);
    }
}
