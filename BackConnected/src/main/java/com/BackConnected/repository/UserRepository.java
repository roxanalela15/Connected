package com.BackConnected.repository;

import com.BackConnected.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository  extends CrudRepository<User, Integer> {
    User findByEmail(String email);
    Boolean existsByEmail(String email);
    Optional<User> findByUserId(Long userId);
    @Transactional
    Long deleteByEmail(String email);
    @Query(value = "SELECT * from user_new where email = ?1 and password = ?2", nativeQuery = true)
    User findByEmailPassword(String email, String password);
    @Query(value = "SELECT * from user_new where name LIKE ?1%", nativeQuery = true)
    List<User> findAllByName(String name);
    List<User> findAll();
    void deleteByUserId(Long id);
}