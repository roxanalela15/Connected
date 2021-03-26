package com.BackConnected.controller;
import java.security.Principal;

import com.BackConnected.model.RegisterResponse;
import com.BackConnected.model.User;
import com.BackConnected.repository.UserRepository;
import com.BackConnected.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
public class UserController {

    private byte[] bytes;

    @Autowired
    private UserService userService;

    @CrossOrigin
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
//
//    @RequestMapping(value = "/login", method = RequestMethod.GET)
//    public Iterable<User> getUsers(){
//        return userRepository.findAll();
//    }

    @CrossOrigin
    @RequestMapping(value = "/api/user/login", method = RequestMethod.POST)
    public User login(@ModelAttribute("email") String email, @ModelAttribute("password") String password) {
        User user = userService.find(email);
        if (user != null)
        {
            if (user.getPassword().equals(password)) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }

    }
    @CrossOrigin
    @RequestMapping(value = "/api/user/upload", method = RequestMethod.POST)
    public void uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        this.bytes = file.getBytes();
    }
//
//    @PutMapping("/update/{id}")
//    public void updateUser(@RequestBody User user,@PathVariable("id") final Long id) {
//        userRepository.save(user);
//    }
}
