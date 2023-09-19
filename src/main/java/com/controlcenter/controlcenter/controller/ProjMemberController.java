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
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.ProjMemberInput;
import com.controlcenter.controlcenter.model.ProjMemberOutput;
import com.controlcenter.controlcenter.service.ProjMemberService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/proj-member")
public class ProjMemberController {

    @Autowired
    public ProjMemberService projMemberService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public ResponseEntity<List<ProjMemberOutput>> getAllProjMember(HttpSession httpSession) {
        // Check if the user is authenticated 
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated
            return projMemberService.getAllProjMember();
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body(new ArrayList<ProjMemberOutput>());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProjMember(@RequestBody ProjMemberInput projMember, HttpSession httpSession){
       // Check if the user is authenticated
       Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

       if (isAuthenticated != null && isAuthenticated) {
           // User is authenticated,  proceed with adding
           //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<ProjMemberInput>> errors = validator.validate(projMember);
                //Error Handling
                if (errors.size() > 0) { //checks the errors from validator
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                }else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return ResponseEntity.status(200).body(projMemberService.addProjMember(projMember, emp_id));
                }
        } else {
            // is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editProjMemberInfo(@PathVariable String id, @RequestBody ProjMemberInput projMember, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated){
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<ProjMemberInput>> errors = validator.validate(projMember);
                //Error Handling
                if (errors.size() > 0) { //checks the errors from validator
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                }else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return ResponseEntity.status(200).body(projMemberService.editProjMemberInfo(id, projMember, emp_id));
                }
        } else {
            // User is not authenticated 
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteProjMember(@PathVariable String id, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                String emp_id = httpSession.getAttribute("session").toString();
                return ResponseEntity.ok().body(projMemberService.logicalDeleteProjMember(id, emp_id));
            }catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }
    
    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreProjMember(@PathVariable String id, HttpSession httpSession) {
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                return ResponseEntity.ok().body(projMemberService.restoreProjMember(id));
            }catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }
}

