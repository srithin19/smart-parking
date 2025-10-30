package com.smartparking.controller;

import com.smartparking.entity.User;
import com.smartparking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public Optional<User> loginUser(@RequestBody User user) {
        return userService.login(user.getUsername(), user.getPassword());
    }
}
