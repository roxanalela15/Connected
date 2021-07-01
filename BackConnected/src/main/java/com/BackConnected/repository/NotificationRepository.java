package com.BackConnected.repository;

import java.util.List;

import com.BackConnected.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>{
    @Query(value = "SELECT * FROM notifications WHERE reciever_id = ?1" , nativeQuery = true)
    List<Notification> findByUserId(long userId);
}