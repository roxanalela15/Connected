package com.BackConnected.repository;

import com.BackConnected.model.Mesaj;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


public interface MesajRepository extends JpaRepository<Mesaj, Long> {

    Mesaj[] findAllByChannel(String channel);

    @Modifying
    @Query(value = "update mesaj set readDate = now() "
            + " where channel = ?1 and sender = ?2 and readDate is null", nativeQuery = true)
    void sendReadReceipt(String channel, String email);
}
