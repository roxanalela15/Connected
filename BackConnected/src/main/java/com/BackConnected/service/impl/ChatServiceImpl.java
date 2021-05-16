package com.BackConnected.service.impl;

import com.BackConnected.model.Chat;
import com.BackConnected.repository.ChatRepository;
import com.BackConnected.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    ChatRepository chatRepository;

    @Override
    public Chat[] findAllByChannel(String channel){
        return chatRepository.findAllByChannel(channel);
    }

    @Override
    public void sendReadReceipt(String channel, String emails, String emailr){
        chatRepository.sendReadReceipt(channel,emails,emailr);
    }

    @Override
    public Chat save(Chat message){
        return chatRepository.save(message);

    }

    @Override
    public String checkChannel(String emails, String emailr){
        return chatRepository.checkChannel(emails,emailr);
    }
}
