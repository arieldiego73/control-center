package com.controlcenter.controlcenter.controller;

import com.controlcenter.controlcenter.model.Account;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserTable;
import com.controlcenter.controlcenter.service.UserService;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping("/all")
  public ResponseEntity<List<UserTable>> getAllUsers() {
    return userService.findAll();
  }

  @GetMapping("/info/{id}")
  public ResponseEntity<UserInfoOutput> getUserById(@PathVariable String id) {
    return userService.getUserById(id);
  }

  // @PostMapping("/create")
  // public String createUser(@RequestBody UserInput user) {
  //   UserInput userHashed = user;
  //   userHashed.setPassword(passEnc.encode(user.getPassword()));

  //   try {
  //     userService.insertUser(userHashed);
  //     return "User created successfully";
  //   } catch (Exception e) {
  //     return e.getMessage();
  //   }
  // }

  @PostMapping("/create-account")
  public ResponseEntity<Account> addAccount(@RequestBody Account account) {
    return userService.addAccount(account);
  }
  // @PostMapping("/createBatch")
  // public String createUser(@RequestBody List<User> user) {
  //   userService.insertUserBatch(user);
  //   return "Multiple users created successfully";
  // }

  // @PostMapping("/login")
  // public ResponseEntity<UserOutput> getUserByUsernameAndPassword(
  //   @RequestBody UserOutput user
  // ) {
  //   UserOutput userFromDB = userService.getUserByUsername(user);
  //   UserOutput nullUser = new UserOutput(); // for incorrect input
  //   if (userFromDB != null) {
  //     boolean isMatched = passEnc.matches(
  //       user.getPassword(),
  //       userFromDB.getPassword()
  //     );

  //     if (isMatched) {
  //       return ResponseEntity.ok(userFromDB);
  //     } else {
  //       return ResponseEntity.badRequest().body(nullUser);
  //     }
  //   } else {
  //     return ResponseEntity.badRequest().body(nullUser);
  //   }
  // }

  @PostMapping("/login")
  public ResponseEntity<UserOutput> getLoggedInUser(@RequestBody UserOutput user) {
    return userService.getLoggedInUser(user);
  }

  @GetMapping("/username")
  public ResponseEntity<UserOutput> getUserByUsername(@RequestParam @Valid @NotBlank String username) {
    return userService.getUsername(username);
  }
}
