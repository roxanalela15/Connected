package com.BackConnected.service.impl;

import com.BackConnected.model.User;
import com.BackConnected.repository.UserRepository;
import com.BackConnected.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public User findByEmail(String email) {

        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByUserId(Long id) {
        return userRepository.findByUserId(id);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> findAllByName(String name){
        return userRepository.findAllByName(name);
    }

    @Override
    public User findByEmailPassword(String email, String password){
        return userRepository.findByEmailPassword(email,password);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }



}
