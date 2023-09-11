package com.controlcenter.controlcenter.controller;

import com.controlcenter.controlcenter.model.RoleInput;
import com.controlcenter.controlcenter.model.RoleOutput;
import com.controlcenter.controlcenter.service.RoleService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
  public List<RoleOutput> getAllRole() {
    return roleService.getAllRole();
  }

  @PostMapping("/add")
  public ResponseEntity<String> addRole(@RequestBody RoleInput roleInput) {
    //For Validation
    ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
    Validator validator = validatorFactory.getValidator();
    Set<ConstraintViolation<RoleInput>> errors = validator.validate(roleInput);
      //Error Handling
      if (errors.size() > 0) { //checks the errors from validator
          return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
      }else{
          return ResponseEntity.status(200).body(roleService.addRole(roleInput));
      }
}

  @PutMapping("/edit/{id}")
  public ResponseEntity<String> editRoleInfo(@PathVariable String id, @RequestBody RoleInput roleInput) {
    //For Validation
    ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
    Validator validator = validatorFactory.getValidator();
    Set<ConstraintViolation<RoleInput>> errors = validator.validate(roleInput);
      //Error Handling
      if (errors.size() > 0) { //checks the errors from validator
          return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
      }else{
          return ResponseEntity.status(200).body(roleService.editRoleInfo(id, roleInput));
      }
  }

  @PutMapping("/delete/{id}")
  public ResponseEntity<List<RoleOutput>> logicalDeleteRole(@PathVariable String id) {
    return roleService.logicalDeleteRole(id);
  }

  @PutMapping("/restore/{id}")
  public ResponseEntity<List<RoleOutput>> restoreRole(@PathVariable String id) {
    String res = roleService.restoreRole(id);
    List<RoleOutput> allRoles = new ArrayList<RoleOutput>();
    if (res.equals("Role restored successfully.")) {
      allRoles = getAllRole();
      return ResponseEntity.ok(allRoles);
    } else {
      return ResponseEntity.badRequest().body(allRoles);
    }
  }

  @PutMapping("/delete-multiple")
  public ResponseEntity<List<RoleOutput>> deleteMultipleRole(
    @RequestParam List<Long> ids
  ) {
    return roleService.deleteMultipleRole(ids);
  }

  @PutMapping("/restore-multiple")
  public String restoreMultipleRole(@RequestParam List<Long> ids) {
    return roleService.restoreMultipleRole(ids);
  }
}
