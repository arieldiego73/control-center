package com.controlcenter.controlcenter.controller;

import com.controlcenter.controlcenter.model.RoleInput;
import com.controlcenter.controlcenter.model.RoleOutput;
import com.controlcenter.controlcenter.service.RoleService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpSession;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

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
@RequestMapping("/role")
public class RoleController {

  @Autowired
  public RoleService roleService;

  @Autowired
  private ErrorHandler errorHandler;

  @GetMapping("/all")
  public ResponseEntity<List<RoleOutput>> getAllRole(HttpSession httpSession) {
    // Check if the user is authenticated 
    Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
    if (isAuthenticated != null && isAuthenticated) {
        // User is authenticated
        return roleService.getAllRole();
    } else {
            // User is not authenticated
          return ResponseEntity.status(401).body(new ArrayList<RoleOutput>());
    }
  }

  @PostMapping("/add")
  public ResponseEntity<String> addRole(@RequestBody RoleInput roleInput, HttpSession httpSession) {
     // Check if the user is authenticated
     Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

    if (isAuthenticated != null && isAuthenticated) {
         // User is authenticated,  proceed with adding
         //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<RoleInput>> errors = validator.validate(roleInput);
          //Error Handling
          if (errors.size() > 0) { //checks the errors from validator
              return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
          }else{
              String emp_id = httpSession.getAttribute("session").toString();
              return ResponseEntity.status(200).body(roleService.addRole(roleInput, emp_id));
          }
    } else {
      // is not authenticated
      return ResponseEntity.status(401).body("Unauthorized");
    }
}

  @PutMapping("/edit/{id}")
  public ResponseEntity<String> editRoleInfo(@PathVariable String id, @RequestBody RoleInput roleInput, HttpSession httpSession) {
    // Check if the user is authenticated
    Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
    if (isAuthenticated != null && isAuthenticated){
        // User is authenticated,  proceed with adding
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<RoleInput>> errors = validator.validate(roleInput);
          //Error Handling
          if (errors.size() > 0) { //checks the errors from validator
              return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
          }else{
            String emp_id = httpSession.getAttribute("session").toString();
              return roleService.editRoleInfo(id, roleInput, emp_id);
          }
    } else {
      // User is not authenticated 
      return ResponseEntity.status(401).body("Unauthorized");
    }
  }

  @PutMapping("/delete/{id}")
  public ResponseEntity<String> logicalDeleteRole(@PathVariable String id,HttpSession httpSession) {
    // Check if the user is authenticated
    Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

    if (isAuthenticated != null && isAuthenticated) {
        try {
          String emp_id = httpSession.getAttribute("session").toString();
          return ResponseEntity.ok().body(roleService.logicalDeleteRole(id, emp_id));
        } catch (Exception e) {
          return ResponseEntity.status(500).body("Server Side Error.");
        }
    } else {
        // User is not authenticated
        return ResponseEntity.status(401).body("Unauthorized");
    }
  }

  @PutMapping("/restore/{id}")
  public ResponseEntity<String> restoreRole(@PathVariable String id, HttpSession httpSession) {
    // Check if the user is authenticated
    Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

    if (isAuthenticated != null && isAuthenticated) {  
        try {
          return ResponseEntity.ok().body(roleService.restoreRole(id));
        } catch (Exception e) {
          return ResponseEntity.status(500).body("Server Side Error.");
        }
    } else {
      // User is not authenticated
      return ResponseEntity.status(401).body("Unauthorized");
    }
  }

  @PutMapping("/delete-multiple")
  public ResponseEntity<String> deleteMultipleRole(@RequestParam List<Long> ids, HttpSession httpSession) {
    // Check if the user is authenticated
    Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

    if (isAuthenticated != null && isAuthenticated) {
        try {
          String emp_id = httpSession.getAttribute("session").toString();
          return ResponseEntity.ok().body(roleService.deleteMultipleRole(ids, emp_id));
        } catch (Exception e) {
          return ResponseEntity.status(500).body("Server Side Error.");
        }
    } else {
      // User is not authenticated
      return ResponseEntity.status(401).body("Unauthorized");
    }
  }

  @PutMapping("/restore-multiple")
  public ResponseEntity<String> restoreMultipleRole(@RequestParam List<Long> ids, HttpSession httpSession) {
    // Check if the user is authenticated
    Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

    if (isAuthenticated != null && isAuthenticated) {
        try {
          return ResponseEntity.ok().body(roleService.restoreMultipleRole(ids));
        } catch (Exception e) {
          return ResponseEntity.status(500).body("Server Side Error.");
        }
    } else {
      // User is not authenticated
      return ResponseEntity.status(401).body("Unauthorized");
    }
  }
}
