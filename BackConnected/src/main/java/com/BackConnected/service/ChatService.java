package com.BackConnected.service;

import com.BackConnected.model.Chat;

public interface ChatService {
    Chat[] findAllByChannel(String channel);
    void sendReadReceipt(String channel, String emails, String emailr);
    Chat save(Chat message);
    String checkChannel(String emails, String emailr);
}
