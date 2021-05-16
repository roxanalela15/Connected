package com.BackConnected.repository;

import com.BackConnected.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


public interface ChatRepository extends JpaRepository<Chat, Long> {

    Chat[] findAllByChannel(String channel);

    @Modifying
    @Query(value = "update chat3 set readDate = now() "
            + " where channel = ?1 and sender = ?2 and receiver = ?3 and readDate is null", nativeQuery = true)
    void sendReadReceipt(String channel, String emails, String emailr);

    @Query(value = "SELECT channel FROM chat3 WHERE (sender = ?1 and receiver = ?2 ) or (sender = ?2 and receiver = ?1) LIMIT 1" , nativeQuery = true)
    String checkChannel(String emails, String emailr);
}

