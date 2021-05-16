package com.BackConnected.controller;

import com.BackConnected.model.Chat;
import com.BackConnected.model.ReadReceiptRequest;
import com.BackConnected.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@Controller
public class ChatController {

    @Autowired
    ChatService chatService;

    @MessageMapping("/messages")

    @SendTo("/chat/messages")
    public Chat chat(Chat message) throws Exception {
        message.setTimestamp(new Date());
        String ch = chatService.checkChannel(message.getSender(), message.getReceiver());
        if (ch !=null){
            message.setChannel(ch);
        }

        chatService.save(message);
        return new Chat(message.getChannel(), message.getSender(),message.getReceiver(),message.getContent(), message.getTimestamp());
    }

    @GetMapping(value = "/message/{channelId}")
    public Chat[] findMessages(@PathVariable("channelId") String channelId) {
        return chatService.findAllByChannel(channelId);
    }

    @PostMapping(value = "/messages")
    public void sendReadReceipt(@RequestBody ReadReceiptRequest request) {
        chatService.sendReadReceipt(request.getChannel(), request.getEmailS(), request.getEmailR());
    }
}