package com.BackConnected.service.impl;

import com.BackConnected.model.Notification;
import com.BackConnected.repository.NotificationRepository;
import com.BackConnected.service.VideocallService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class VideocallServiceImpl implements VideocallService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public List<Notification> findByUserId(long userId){
        return notificationRepository.findByUserId(userId);
    }

    @Override
    public Notification save(Notification newnotification){
        return notificationRepository.save(newnotification);

    }

    @Override
    public void deleteById(long userId){
        notificationRepository.deleteById(userId);
    }
}
