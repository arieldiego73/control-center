package com.controlcenter.controlcenter.controller;

import com.controlcenter.controlcenter.model.User;
import com.controlcenter.controlcenter.service.UserDAOImpl;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

  private UserDAOImpl userDAOImpl;

  public UserController(UserDAOImpl userDAOImpl) {
    this.userDAOImpl = userDAOImpl;
  }

  @GetMapping("/all")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userDAOImpl.findAll();
    return ResponseEntity.ok(users);
  }

  @GetMapping("/user/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    User user = userDAOImpl.getUserById(id);
    return ResponseEntity.ok(user);
  }

  @PostMapping("/user/create")
  public String createUser(@RequestBody User user) {
    userDAOImpl.insertUser(user);
    return "User created successfully";
  }

  @PostMapping("/user/createBatch")
  public String createUser(@RequestBody List<User> user) {
    userDAOImpl.insertUserBatch(user);
    return "Multiple users created successfully";
  }
}
