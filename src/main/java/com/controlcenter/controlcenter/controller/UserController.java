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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  ErrorHandler errorHandler;

  @GetMapping("/user-table")
  public ResponseEntity<List<UserTable>> userTable(HttpSession httpSession) {
    // String principal_id = httpSession.getAttribute("session").toString();
    ResponseEntity<List<UserTable>> userTable = userService.userTable();
    // userTable.getBody().removeIf(user -> user.getEmp_id().equals(principal_id));

    return userTable;
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

  @PostMapping("/create-account")
  public ResponseEntity<String> addAccount(@ModelAttribute AccountInput account, @RequestParam List<Long> role_ids, @RequestParam(value = "photo",required = false) MultipartFile photo, HttpSession httpSession) {
    //For Validation
    ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
    Validator validator = validatorFactory.getValidator();
    Set<ConstraintViolation<AccountInput>> errors = validator.validate(account);
      //Error Handling
      if (errors.size() > 0) { //checks the errors from validator
          return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
      } else{
        String emp_id = httpSession.getAttribute("session").toString();
          return userService.addAccount(account, role_ids, emp_id, photo);
      }
  }

  @PutMapping("/edit-account/{id}")
  public ResponseEntity<String> editAccount(@PathVariable String id, @ModelAttribute AccountOutput accountBody, @RequestParam List<Long> role_ids, @RequestParam(value = "photo",required = false) MultipartFile photo, HttpSession httpSession) {
    //For Validation
    ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
    Validator validator = validatorFactory.getValidator();
    Set<ConstraintViolation<AccountOutput>> error = validator.validate(accountBody);
      //Error Handling
      if (error.size() > 0) { //checks the errors from validator
        return ResponseEntity.status(400).body(errorHandler.getErrors(error));
      }else{
        String emp_id = httpSession.getAttribute("session").toString();
        return userService.editAccount(id, accountBody, role_ids, emp_id, photo, httpSession);
      }
  }

  @PutMapping("/delete/{id}")
  public ResponseEntity<String> logicalDeleteUser(@PathVariable String id, HttpSession httpSession) {
    try {
      String emp_id = httpSession.getAttribute("session").toString();
      return userService.logicalDeleteUser(id, emp_id);
    } catch (Exception e) {
      return ResponseEntity.status(500).build();
    }
  }

  @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultipleUser(@RequestParam List<String> ids, HttpSession httpSession) {
        // Check uf the user is authenticated
        // Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        // if (isAuthenticated != null && isAuthenticated){
            try {
                String emp_id = httpSession.getAttribute("session").toString();
              return ResponseEntity.ok().body(userService.deleteMultipleUser(ids, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error");
            }
        // } else {
        //     // User is not authenticated
        //     return ResponseEntity.status(401).body("Unauthorized");
        // }
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

  @GetMapping("/managers")
  public ResponseEntity<List<UserInfoOutput>> getAllPossibleManager() {
    try {
      return userService.getAllPossibleManager();
    } catch (Exception e) {
      return ResponseEntity.notFound().build();
    }
  }

  @PutMapping("/password-change/{user_id}")
  public ResponseEntity<String> changePassword(
    @PathVariable String user_id, 
    @RequestParam String admin_password, 
    @RequestParam String new_password, 
    @RequestParam String confirm_new_password,
    HttpSession httpSession) {
      String principal_id = httpSession.getAttribute("session").toString();
      return userService.changePassword(user_id, admin_password, new_password, confirm_new_password, principal_id);
  }
}
