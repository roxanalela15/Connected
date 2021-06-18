package com.BackConnected.controller;

import com.BackConnected.model.Notification;
import com.BackConnected.service.RemoteService;
import com.BackConnected.service.RequestRemote;
import com.BackConnected.service.SetPassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.*;
import java.net.Socket;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Component
public class RemoteController {
    static String port = "4200";
    @GetMapping("/videocall/setremote")
    public void setRemote(){
        SetPassword frame1= new SetPassword();
        frame1.setSize(300,80);
        frame1.setLocation(500,300);
        frame1.setVisible(true);
    }

    @GetMapping("/video-call/{id}/getremote")
    public void getRemote(@PathVariable("id") String id){
        String ip = JOptionPane.showInputDialog("Please enter server ip");
        new RemoteController().initialize(ip, Integer.parseInt(port));
    }

    public void initialize(String ip, int port){
        try{

            Socket sc = new Socket(ip,port);
            System.out.println("Connecting to the Server");
            //Authenticate class is responsible for security purposes
            RequestRemote frame1= new RequestRemote(sc);

            frame1.setSize(300,80);
            frame1.setLocation(500,300);
            frame1.setVisible(true);
        } catch (Exception ex){
            ex.printStackTrace();
        }
    }
}

