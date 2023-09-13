package com.controlcenter.controlcenter.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.MultiRoleInput;
import com.controlcenter.controlcenter.model.MultiRoleOutput;
import com.controlcenter.controlcenter.service.MultiRoleService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/multi-role")
public class MultiRoleController {
    
    @Autowired
    public MultiRoleService multiRoleService;
    
    @Autowired
    ErrorHandler errorHandler;

    @GetMapping("/all")
    public List<MultiRoleOutput> getAllMultiRole() {
        return multiRoleService.getAllMultiRole();
    }

    @GetMapping("/multi-role-id/{id}")
    public MultiRoleOutput getMultiRoleById(@PathVariable String id) {
        return multiRoleService.getMultiRoleById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addMultiRole(@RequestBody MultiRoleInput multiRole){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<MultiRoleInput>> errors = validator.validate(multiRole);
            //Error Handling
            if(errors.size() > 0){
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else{
                return ResponseEntity.status(200).body(multiRoleService.addMultiRole(multiRole));
            }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editMultiRoleInfo(@PathVariable String id, @RequestBody MultiRoleInput multiRole) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<MultiRoleInput>> errors = validator.validate(multiRole);
            //Error Handling
            if(errors.size() > 0){
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else{
                return ResponseEntity.status(200).body(multiRoleService.editMultiRoleInfo(id, multiRole));
            }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteMultiRole(@PathVariable String id) {
        try {
            return ResponseEntity.ok().body(multiRoleService.logicalDeleteMultiRole(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreMultiRole(@PathVariable String id) {
        try {
            return ResponseEntity.ok().body(multiRoleService.restoreMultiRole(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }

}
