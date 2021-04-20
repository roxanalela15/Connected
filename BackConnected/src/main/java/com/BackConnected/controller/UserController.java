package com.BackConnected.controller;

import com.BackConnected.model.RegisterResponse;
import com.BackConnected.model.User;
import com.BackConnected.repository.UserRepository;
import com.BackConnected.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private byte[] bytes;

    @Autowired
    private UserService userService;

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "/api/user/register", method = RequestMethod.POST)
    public RegisterResponse register(HttpServletResponse response, @RequestBody User user) {
        try {
            user.setPicByte(this.bytes);
            user.setRole("ROLE_USER");

            if (userService.find(user.getUsername()) != null) {
                return new RegisterResponse("Already registered!", false);
            }
            userService.save(user);
            this.bytes = null;
            return new RegisterResponse("Success!", true);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return new RegisterResponse("Error!", false);
        }
    }

    @RequestMapping(value = "/api/user/upload", method = RequestMethod.POST)
    public void uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        this.bytes = file.getBytes();
    }

//    @GetMapping("/api/user/login")
//    public Principal user(Principal user) {
//        template.convertAndSend("/channel/login", user);
//        return user;
//    }




    @GetMapping("/api/people")
    public Iterable<User> getUsers(){
        System.out.println(userRepository.findAll());
        return userRepository.findAll();
    }


}
