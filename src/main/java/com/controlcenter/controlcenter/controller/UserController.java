package com.controlcenter.controlcenter.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.dao.UserDAOImpl;
import com.controlcenter.controlcenter.model.User;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api")
public class UserController {

    private UserDAOImpl userDAOImpl;

    @Autowired
    public UserController(UserDAOImpl userDAOImpl) {
        this.userDAOImpl = userDAOImpl;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userDAOImpl.findAll();
        return ResponseEntity.ok(users);
    }
    
}
