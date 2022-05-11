package com.example.flint.controller;

import com.example.flint.model.User;
import com.example.flint.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;
    
    @PostMapping("/users")
    public ResponseEntity<User> save(User user) throws URISyntaxException {
        User result = userService.save(user);
        return ResponseEntity
                .created(new URI("/user/" + result.getUserName()))
                .body(result);
    }

    @PutMapping("/users")
    public ResponseEntity<User> update(User user){
        User result = userService.save(user);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/users/userAuthentication")
    public  ResponseEntity<Boolean> match(
            @RequestParam(value = "user") String username,
            @RequestParam(value = "password") String password){
        return new ResponseEntity<>(userService.match(username, password), HttpStatus.OK);
    }
}
