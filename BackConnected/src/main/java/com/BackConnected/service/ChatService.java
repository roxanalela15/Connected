package com.BackConnected.service;

import com.BackConnected.model.Chat;

public interface ChatService {
    Chat[] findAllByChannel(String channel);
    Chat save(Chat message);
    String checkChannel(String emails, String emailr);
}
