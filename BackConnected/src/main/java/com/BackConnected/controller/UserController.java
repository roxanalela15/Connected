package com.BackConnected.controller;

import com.BackConnected.exception.CustomErrors;
import com.BackConnected.model.User;
import com.BackConnected.repository.UserRepository;
import com.BackConnected.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Component
public class UserController {
    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private User user;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SimpMessagingTemplate template;

    @GetMapping("/")
    public ResponseEntity<Iterable<User>> getAllUser(){
        Iterable<User> users = userService.findAll();
        return new ResponseEntity<Iterable<User>>(users, HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/api/auth/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> createUser(@Valid @RequestBody User user){
        logger.info("Creating User: {}", user);
        if(userService.findByEmail(user.getEmail())!=null) {
            logger.error("Email {} already exist",user.getEmail());
            return new ResponseEntity<User>(new CustomErrors("User already exist"),HttpStatus.CONFLICT);
        }
        user.setRole("ROLE_USER");
        userService.save(user);
        this.user = user;
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    @PostMapping(value = "/api/auth/signin", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> login(@Valid @RequestBody User user){
        if(userService.findByEmail(user.getEmail())== null || userService.findByEmailPassword(user.getEmail(), user.getPassword()) == null) {
            logger.error("user not found");
            return new ResponseEntity<User>(new CustomErrors("User Not Found"),HttpStatus.NOT_FOUND);
        }
        User u = userService.findByEmail(user.getEmail());
        this.user = u;
        template.convertAndSend("/channel/login", this.user);
        return new ResponseEntity<User>(u,HttpStatus.ACCEPTED);
    }

@PutMapping("/api/images")
public ResponseEntity<User> uploadImage(@RequestParam("pic") MultipartFile file) throws IOException {
    System.out.println("Original Image Byte Size - " + file.getBytes().length);
    System.out.println("name: " + file.getOriginalFilename());
    User user = (userService.findByUserId(Long.parseLong(file.getOriginalFilename()))).get();
    user.setPicByte(compressBytes(file.getBytes()));
    userService.save(user);
    return new ResponseEntity<User>(user,HttpStatus.OK);
}


    @GetMapping("/api/image/{id}")
    public User getImage(@PathVariable("id") String id) throws IOException {
        final Optional<User> retrievedUser = userService.findByUserId(Long.parseLong(id));
        User user = retrievedUser.get();
        user.setPicByte(decompressBytes(user.getPicByte()));
        return user;
    }

    @GetMapping("/api/searchusers/{name}")
    public ResponseEntity<List<User>> searchUsers(@PathVariable("name") String name){
        List<User> users = userService.findAllByName(name);
        return new ResponseEntity<List<User>>(users, HttpStatus.ACCEPTED);
    }

    @GetMapping("/api/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id){
        User user = (userService.findByUserId(id)).get();
        if(user == this.user){
            user = null;
        }
        return new ResponseEntity<User>(user, HttpStatus.OK);

    }

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }

    public static byte[] decompressBytes(byte[] data) {
        if(data == null) {
            return null;
        }
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }

    @RequestMapping(value = "/api/users", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<User> findConnectedUsers() {
        //System.out.println("Am ajuns in server");
        return userService.findAll();
    }


    @Transactional
    @DeleteMapping(path = { "/api/deleteAccount/{id}" })
    public User deleteAccount(@PathVariable(value = "id") Long id) {
        User user = userRepository.findByUserId(id).get();
        userRepository.deleteByUserId(id);
        return user;
    }


}
