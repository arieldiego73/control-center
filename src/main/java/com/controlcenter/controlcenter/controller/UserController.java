package com.controlcenter.controlcenter.controller;

import com.controlcenter.controlcenter.model.Account;
import com.controlcenter.controlcenter.model.User;
import com.controlcenter.controlcenter.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  private PasswordEncoder passEnc;

  @GetMapping("/all")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.findAll();
    return ResponseEntity.ok(users);
  }

  @GetMapping("/user/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    User user = userService.getUserById(id);
    return ResponseEntity.ok(user);
  }

  @PostMapping("/create")
  public String createUser(@RequestBody User user) {
    User userHashed = user;
    userHashed.setPassword(passEnc.encode(user.getPassword()));

    try {
      userService.insertUser(userHashed);
      return "User created successfully";
    } catch (Exception e) {
      return e.getMessage();
    }
  }

  @PostMapping("/createAccount/{id}")
  public String addAccount(@PathVariable String id, @RequestBody Account account) {
    return userService.addAccount(id, account);
  }
  // @PostMapping("/createBatch")
  // public String createUser(@RequestBody List<User> user) {
  //   userService.insertUserBatch(user);
  //   return "Multiple users created successfully";
  // }

  @PostMapping("/login")
  public ResponseEntity<User> getUserByUsernameAndPassword(
    @RequestBody User user
  ) {
    User userFromDB = userService.getUserByUsername(user);
    User nullUser = new User(); // for incorrect input
    if (userFromDB != null) {
      boolean isMatched = passEnc.matches(
        user.getPassword(),
        userFromDB.getPassword()
      );

      if (isMatched) {
        return ResponseEntity.ok(userFromDB);
      } else {
        return ResponseEntity.badRequest().body(nullUser);
      }
    } else {
      return ResponseEntity.badRequest().body(nullUser);
    }
  }
}
