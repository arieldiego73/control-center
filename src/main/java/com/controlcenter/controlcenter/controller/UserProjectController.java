package com.controlcenter.controlcenter.controller;

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


import com.controlcenter.controlcenter.model.UserProjectInput;
import com.controlcenter.controlcenter.model.UserProjectOutput;
import com.controlcenter.controlcenter.service.UserProjectService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/user-project")
public class UserProjectController {
    
    @Autowired
    public UserProjectService userProjectService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public ResponseEntity<List<UserProjectOutput>> getAllUserProject(HttpSession httpSession) {
        // Check if the user is authenticated 
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated
            return userProjectService.getAllUserProject();
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body(new ArrayList<UserProjectOutput>());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addUserProject(@RequestBody UserProjectInput userProject, HttpSession httpSession){
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<UserProjectInput>> errors = validator.validate(userProject);
                //Error Handling
                if (errors.size() > 0) { //checks the errors from validator
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                }else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return ResponseEntity.status(200).body(userProjectService.addUserProject(userProject, emp_id));
                }
        } else {
            // is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editUserProjectInfo(@PathVariable String id, @RequestBody UserProjectInput userProject, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated){
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<UserProjectInput>> errors = validator.validate(userProject);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                String emp_id = httpSession.getAttribute("session").toString();
                return ResponseEntity.status(200).body(userProjectService.editUserProjectInfo(id, userProject, emp_id));
            }
        } else {
            // User is not authenticated 
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }
    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteUserProject(@PathVariable String id, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated) {
            try {
                String emp_id = httpSession.getAttribute("session").toString();
                return ResponseEntity.ok().body(userProjectService.logicalDeleteUserProject(id, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultipleUserProject(@RequestParam List<Long> ids, HttpSession httpSession) {
        // Check uf the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                String emp_id = httpSession.getAttribute("session").toString();
            return ResponseEntity.ok().body(userProjectService.deleteMultipleUserProject(ids, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreUserProject(@PathVariable String id, HttpSession httpSession) {
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                return ResponseEntity.ok().body(userProjectService.restoreUserProject(id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            return ResponseEntity.status(401).body("Unauthorized");
        }     
    }
}