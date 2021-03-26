package com.BackConnected.repository;

import com.BackConnected.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository  extends CrudRepository<User, Integer> {
    User findByEmail(String email);
    Boolean existsByEmail(String email);
}