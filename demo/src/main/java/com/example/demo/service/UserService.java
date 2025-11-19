package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepo;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    private final UserRepo repo;

    public UserService(UserRepo repo) {
        this.repo = repo;
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User getUserByUsername(String username) {
        return repo.findByUsername(username);
    }

    public User createUser(User user) {
        return repo.save(user);
    }

    public void deleteUser(Long id) {
        repo.deleteById(id);
    }
}
