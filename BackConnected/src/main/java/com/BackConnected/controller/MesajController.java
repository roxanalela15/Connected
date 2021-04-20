package com.BackConnected.controller;

import com.BackConnected.model.Mesaj;
import com.BackConnected.model.ReadReceiptRequest;
import com.BackConnected.repository.MesajRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;

@RestController
public class MesajController {

    @Autowired
    MesajRepository mesajRepository;

    @GetMapping(value = "/message/{channelId}")
    public Mesaj[] findMessages(@PathVariable("channelId") String channelId) {
        return mesajRepository.findAllByChannel(channelId);
    }

    @PostMapping(value = "/messages")
    public void sendReadReceipt(@RequestBody ReadReceiptRequest request) {
        mesajRepository.sendReadReceipt(request.getChannel(), request.getEmail());
    }
}