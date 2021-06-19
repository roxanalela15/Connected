package com.BackConnected.repository;

import com.BackConnected.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


public interface ChatRepository extends JpaRepository<Chat, Long> {

    Chat[] findAllByChannel(String channel);


    @Query(value = "SELECT channel FROM chat_table WHERE (sender = ?1 and receiver = ?2 ) or (sender = ?2 and receiver = ?1) LIMIT 1" , nativeQuery = true)
    String checkChannel(String emails, String emailr);
}

