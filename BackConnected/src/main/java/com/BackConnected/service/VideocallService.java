package com.BackConnected.service;

import com.BackConnected.model.Notification;

import java.util.List;

public interface VideocallService {
    List<Notification> findByUserId(long userId);
    Notification save(Notification newnotification);
    void deleteById(long userId);
}
