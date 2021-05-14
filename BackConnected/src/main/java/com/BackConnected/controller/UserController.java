package com.BackConnected.controller;

import com.BackConnected.exception.CustomErrors;
import com.BackConnected.model.Notification;
import com.BackConnected.model.RegisterResponse;
import com.BackConnected.model.User;
import com.BackConnected.repository.NotificationRepository;
import com.BackConnected.repository.UserRepository;
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

import javax.servlet.http.HttpServletResponse;
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
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private SimpMessagingTemplate template;

    @GetMapping("/")
    public ResponseEntity<Iterable<User>> getAllUser(){
        Iterable<User> users = userRepository.findAll();
        return new ResponseEntity<Iterable<User>>(users, HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> createUser(@Valid @RequestBody User user){
        logger.info("Creating User: {}", user);
        if(userRepository.findByEmail(user.getEmail())!=null) {
            logger.error("Email {} already exist",user.getEmail());
            return new ResponseEntity<User>(new CustomErrors("User already exist"),HttpStatus.CONFLICT);
        }
        user.setRole("ROLE_USER");
        userRepository.save(user);
        this.user = user;
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> login(@Valid @RequestBody User user){
        if(userRepository.findByEmail(user.getEmail())== null || userRepository.findByEmailPassword(user.getEmail(), user.getPassword()) == null) {
            logger.error("user not found");
            return new ResponseEntity<User>(new CustomErrors("User Not Found"),HttpStatus.NOT_FOUND);
        }
        User u = userRepository.findByEmail(user.getEmail());
        this.user = u;

        template.convertAndSend("/channel/login", this.user);
        return new ResponseEntity<User>(u,HttpStatus.ACCEPTED);
    }


    @PostMapping("/upload")
    public ResponseEntity<User> uploadImage(@RequestParam("pic") MultipartFile file) throws IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        System.out.println("name: " + file.getOriginalFilename());
        User user = ((Optional<User>) userRepository.findByUserId(Long.parseLong(file.getOriginalFilename()))).get();
        user.setPicByte(compressBytes(file.getBytes()));
        userRepository.save(user);
        return new ResponseEntity<User>(user,HttpStatus.OK);
    }


    @GetMapping("/get/{id}")
    public User getImage(@PathVariable("id") String id) throws IOException {
        final Optional<User> retrievedUser = userRepository.findByUserId(Long.parseLong(id));
        User user = retrievedUser.get();
        user.setPicByte(decompressBytes(user.getPicByte()));
        return user;
    }

    @GetMapping("/users/{name}")
    public ResponseEntity<List<User>> searchUsers(@PathVariable("name") String name){
        List<User> users = userRepository.findAllByName(name);
        return new ResponseEntity<List<User>>(users, HttpStatus.ACCEPTED);
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id){
        User user = ((Optional<User>)userRepository.findByUserId(id)).get();
        return new ResponseEntity<User>(user, HttpStatus.OK);

    }

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
        notificationRepository.save(newNotif);
    }

    @GetMapping("/notifications/{id}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable("id") String id){
        List<Notification> notifList = notificationRepository.findByUserId(Long.parseLong(id));
        return new ResponseEntity<List<Notification>>(notifList, HttpStatus.OK);
    }

    @DeleteMapping("/notification/{id}")
    public ResponseEntity<Notification> deleteNotification(@PathVariable("id") Long id){
        notificationRepository.deleteById(id);
        return new ResponseEntity<Notification>(HttpStatus.NO_CONTENT);
    }
    // compress the image bytes before storing it in the database
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
    // uncompress the image bytes before returning it to the angular application
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

    @RequestMapping(value = "/listUsers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<User> findConnectedUsers() {
        System.out.println("Am ajuns in server");
        return userRepository.findAll();
    }


}
