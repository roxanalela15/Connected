package com.BackConnected.repository;

import com.BackConnected.model.User;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface UserRepository  extends CrudRepository<User, Integer> {
    User findByEmail(String email);
    Boolean existsByEmail(String email);
   
    @Transactional
    Long deleteByEmail(String email);
}