package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Entry;

import java.util.List;

@Repository
public interface EntryRepo extends JpaRepository<Entry, Long> {
    List<Entry> findByWord(String word);
}
