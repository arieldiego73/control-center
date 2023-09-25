package com.controlcenter.controlcenter.controller;

import com.controlcenter.controlcenter.model.AccountInput;
import com.controlcenter.controlcenter.model.AccountOutput;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserTable;
import com.controlcenter.controlcenter.service.UserService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;
import javax.validation.ConstraintViolation;
import javax.validation.Valid;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.validation.constraints.NotBlank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  ErrorHandler errorHandler;

  @GetMapping("/user-table")
  public ResponseEntity<List<UserTable>> userTable() {
    return userService.userTable();
  }

  @GetMapping("/all")
  public ResponseEntity<List<UserOutput>> getAllUser() {
    return userService.getAllUser();
  }

  @GetMapping("/info/{id}")
  public ResponseEntity<UserInfoOutput> getUserById(@PathVariable String id) {
    return userService.getUserById(id);
  }

  @GetMapping("/multiple-user")
  public ResponseEntity<List<UserInfoOutput>> getMultipleUserById(@RequestParam List<String> emp_ids) {
    return userService.getMultipleUserById(emp_ids);
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
  public ResponseEntity<String> addAccount(@RequestBody AccountInput account, @RequestParam List<Long> role_ids) {
    //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<AccountInput>> errors = validator.validate(account);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
              String emp_id = "101"; //httpSession.getAttribute("session").toString();
                return userService.addAccount(account, role_ids, emp_id);
            }
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

  @PutMapping("/edit-account/{id}")
  public ResponseEntity<String> editAccount(@PathVariable String id, @RequestBody AccountOutput accountBody, @RequestParam List<Long> role_ids) {
    //For Validation
    ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
    Validator validator = validatorFactory.getValidator();
    Set<ConstraintViolation<AccountOutput>> error = validator.validate(accountBody);
      //Error Handling
      if (error.size() > 0) { //checks the errors from validator
        return ResponseEntity.status(400).body(errorHandler.getErrors(error));
      }else{
        String emp_id = "101"; // httpSession.getAttribute("session").toString();
        return userService.editAccount(id, accountBody, role_ids, emp_id);
      }
  }

  @PutMapping("/delete/{id}")
  public ResponseEntity<String> logicalDeleteUser(@PathVariable String id) {
    try {
      String emp_id = "101"; // httpSession.getAttribute("session").toString();
      return userService.logicalDeleteUser(id, emp_id);
    } catch (Exception e) {
      return ResponseEntity.status(500).build();
    }
  }

  @PutMapping("/restore/{id}")
  public ResponseEntity<String> restoreUser(@PathVariable String id) {
    try {
      return userService.restoreUser(id);
    } catch (Exception e) {
      return ResponseEntity.status(500).build();
    }
  }

  @PostMapping("/login")
  public ResponseEntity<String> getLoggedInUser(@RequestBody UserOutput user) {
    //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<UserOutput>> errors = validator.validate(user);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(userService.getLoggedInUser(user));
            }
  }

  @GetMapping("/username")
  public UserOutput getUserByUsername(@RequestParam @Valid @NotBlank String username) {
    return userService.getUsername(username);
  }

  //get all roles of currently logged in user
  @GetMapping("/roles")
  public ResponseEntity<List<Map<Long, Object>>> getAllRolesOfLoggedInUser(HttpSession http) {
    String emp_id = http.getAttribute("session").toString();
    return userService.getAllRolesOfUser(emp_id);
  }

  //get all roles of a user
  @GetMapping("/roles/{emp_id}")
  public ResponseEntity<List<Map<Long, Object>>> getAllRolesOfUser(@PathVariable String emp_id) {
    return userService.getAllRolesOfUser(emp_id);
  }
}
