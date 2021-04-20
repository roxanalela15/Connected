package com.BackConnected.service;

import com.BackConnected.model.User;
import com.BackConnected.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }
    public User find(String email) {
        return userRepository.findByEmail(email);
    }
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }
    public User connect(User user){
        User dbUser = userRepository.findByEmail(user.getEmail());

        if (dbUser != null) {
            dbUser.setConnected(true);
            return userRepository.save(dbUser);
        }

        user.setConnected(true);
        return userRepository.save(user);
    }

    public User disconnect(User user){
        if (user == null) {
            return null;
        }

        User dbUser = userRepository.findByEmail(user.getEmail());
        if (dbUser == null) {
            return user;
        }

        dbUser.setConnected(false);
        return userRepository.save(dbUser);
    }
}
