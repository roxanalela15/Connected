package com.BackConnected.service;

import com.BackConnected.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User findByEmail(String username);
    Optional<User> findByUserId(Long id);
    User save(User user);
    List<User> findAll();
    List<User> findAllByName(String name);
    User findByEmailPassword(String email, String password);

}
