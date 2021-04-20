package com.BackConnected.controller;

import com.BackConnected.model.Mesaj;
import com.BackConnected.repository.MesajRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;

@Controller
public class ChatController {

//    //@Autowired
//    private final SimpMessagingTemplate template;
//
//    @Autowired
//    ChatController(SimpMessagingTemplate template){
//        this.template = template;
//    }
    @Autowired
    MesajRepository mesajRepository;

//    @MessageMapping("/messages")
//    //@SendToUser("/channel/chat")
//    public void handleMessage(Mesaj message) {
//        message.setTimestamp(new Date());
//        mesajRepository.save(message);
//        template.convertAndSend("/channel/" + message.getChannel(), message);
//    }
    //@MessageMapping("/sendmsg")
    @MessageMapping("/messages")
    // the return value is broadcast to all subscribers of /chat/messages
    @SendTo("/chat/messages")
    public Mesaj chat(Mesaj message) throws Exception {
        message.setTimestamp(new Date());
        //Thread.sleep(1000); // simulated delay
        mesajRepository.save(message);
        return new Mesaj(message.getChannel(), message.getSender(),message.getContent(), message.getTimestamp());
    }
}