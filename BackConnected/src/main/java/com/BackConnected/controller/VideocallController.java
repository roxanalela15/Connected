package com.BackConnected.controller;

import com.BackConnected.model.Notification;
import com.BackConnected.model.User;
import com.BackConnected.service.UserService;
import com.BackConnected.service.VideocallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://192.168.100.37:4200")
@Component
public class VideocallController {

    @Autowired
    private VideocallService videocallService;

    @PostMapping("/videocall")
    public void videoCallRequest(@Valid @RequestBody String data[]) {
        System.out.println(data[0] + " " + data[1] + " " + data[2]);
        Notification newNotif = new Notification();
        newNotif.setCode(data[1]);
        User u = new User();
        System.out.println(Long.parseLong(data[0]));
        u.setUserId(Long.parseLong(data[0]));
        newNotif.setUser(u);
        newNotif.setSenderName(data[2]);
        videocallService.save(newNotif);
    }

    @GetMapping("/notifications/{id}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable("id") String id){
        List<Notification> notifList = videocallService.findByUserId(Long.parseLong(id));
        return new ResponseEntity<List<Notification>>(notifList, HttpStatus.OK);
    }

    @DeleteMapping("/notification/{id}")
    public ResponseEntity<Notification> deleteNotification(@PathVariable("id") Long id){
        videocallService.deleteById(id);
        return new ResponseEntity<Notification>(HttpStatus.NO_CONTENT);
    }
}
