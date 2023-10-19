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
 
import com.controlcenter.controlcenter.model.PersonalInfoInput;
import com.controlcenter.controlcenter.model.PersonalInfoOutput;
import com.controlcenter.controlcenter.service.PersonalInfoService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/personal-info")
public class PersonalInfoController {
    
    @Autowired  
    public PersonalInfoService personalInfoService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public ResponseEntity<List<PersonalInfoOutput>> getAllPersonalInfo(HttpSession httpSession) {
        // Check if the user is authenticated 
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated
            return personalInfoService.getAllPersonalInfo();
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body(new ArrayList<PersonalInfoOutput>());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addPersonalInfo(@RequestBody PersonalInfoInput personalInfo, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<PersonalInfoInput>> errors = validator.validate(personalInfo);
                //Error Handling
                if(errors.size() > 0){
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                } else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return ResponseEntity.status(200).body(personalInfoService.addPersonalInfo(personalInfo, emp_id));
                }
        } else {
             // is not authenticated
             return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editPersonalInfo(@PathVariable String id, @RequestBody PersonalInfoInput personalInfo, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated){
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<PersonalInfoInput>> errors = validator.validate(personalInfo);
                //Error Handling
                if(errors.size() > 0){
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                } else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return ResponseEntity.status(200).body(personalInfoService.editPersonalInfo(id, personalInfo, emp_id));
                }
        } else {
            // User is not authenticated 
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("delete/{id}")
    public ResponseEntity<String> logicalDeletePersonalInfo(@PathVariable String id, HttpSession httpSession) {
         // Check if the user is authenticated
         Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

         if (isAuthenticated != null && isAuthenticated) {
            try {
                String emp_id = httpSession.getAttribute("session").toString();
                return ResponseEntity.ok().body(personalInfoService.logicalDeletePersonalInfo(id, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
          // User is not authenticated
          return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultiplePersonalInfo(@RequestParam List<String> ids, HttpSession httpSession) {
        // Check uf the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                String emp_id = httpSession.getAttribute("session").toString();
              return ResponseEntity.ok().body(personalInfoService.deleteMultiplePersonalInfo(ids, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("restore/{id}")
    public ResponseEntity<String> restorePersonalInfo(@PathVariable String id, HttpSession httpSession) {
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                return ResponseEntity.ok().body(personalInfoService.restorePersonalInfo(id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            return ResponseEntity.status(401).body("Unauthorized");
        }         
    }
}
