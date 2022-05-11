package com.example.flint.controller;

import com.example.flint.model.User;
import com.example.flint.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;
    
    @PostMapping("/users")
    public User save(User user){
        return userService.save(user);
    }

    @DeleteMapping("/users")
    public void delete(User user){
        userService.delete(user);
    }

    @PutMapping("/users")
    public User update(User user){
        return userService.save(user);
    }

    @GetMapping("/users/userAuthentication")
    public boolean match(User user){
        return userService.match(user);
    }
}
