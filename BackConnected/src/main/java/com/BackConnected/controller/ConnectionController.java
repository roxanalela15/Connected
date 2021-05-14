package com.BackConnected.controller;

import com.BackConnected.exception.CustomErrors;
import com.BackConnected.model.User;
//import com.BackConnected.model.Utilizator;
import com.BackConnected.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.ServerEndpoint;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ConnectionController {
//    public static final Logger logger = LoggerFactory.getLogger(ConnectionController.class);
//
//    private User user;
//    @Autowired
//    UserService userService;
//
//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    private SimpMessagingTemplate template;
//
//
//    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> login(@RequestBody User user) {
//
//
//        if(userRepository.findByEmail(user.getEmail())== null || userRepository.findByEmailPassword(user.getEmail(), user.getPassword()) == null) {
//            logger.error("user not found");
//            return new ResponseEntity<User>(new CustomErrors("User Not Found"),HttpStatus.NOT_FOUND);
//        }
//        User u = userRepository.findByEmail(user.getEmail());
//        this.user = u;
//        //User connectedUser = userService.connect(user);
//        template.convertAndSend("/channel/login", this.user);
//
//
//        return ResponseEntity.ok().build();
//    }
//
//    @RequestMapping(value = "/logout", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void logout(@RequestBody User user) {
//        User disconnectedUser = userService.disconnect(user);
//        template.convertAndSend("/channel/logout", disconnectedUser);
//    }
//
//    @RequestMapping(value = "/listUsers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    public Iterable<User> findConnectedUsers() {
//        System.out.println("Am ajuns in server");
//        return userRepository.findAll();
//    }
//
//    @RequestMapping(value = "/clearAll", method = RequestMethod.GET)
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void clearAll() {
//        userRepository.deleteAll();
//    }
//}
}