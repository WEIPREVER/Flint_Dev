package com.example.flint.service;

import com.example.flint.model.User;
import com.example.flint.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User save(User user){
        return userRepository.save(user);
    }

    public void delete(User user){
        userRepository.delete(user);
    }

    public User update(User user){
        return userRepository.save(user);
    }

    public User findByUserName(String username){
        return userRepository.findByUserName(username);
    }

    public boolean match(String user, String password){
        User data = userRepository.findByUserName(user);
        if (data!=null) {
            String password1 = data.getPassword();
            return password.equals(password1);
        }
        else return false;
    }
}