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

import com.controlcenter.controlcenter.model.DevPhaseInput;
import com.controlcenter.controlcenter.model.DevPhaseOutput;
import com.controlcenter.controlcenter.service.DevPhaseService;
import com.controlcenter.controlcenter.shared.ErrorHandler;


@RestController
@RequestMapping("/dev-phase")
public class DevPhaseController {

    @Autowired
    public DevPhaseService devPhaseService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public ResponseEntity<List<DevPhaseOutput>> getAllDevPhase(HttpSession httpSession) {
        // Check if the user is authenticated 
         Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
         if (isAuthenticated != null && isAuthenticated) {
             // User is authenticated  
            return devPhaseService.getAllDevPhase();
        } else {
            // User is not authenticated
            return ResponseEntity.ok(new ArrayList<DevPhaseOutput>());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addDevPhase(@RequestBody DevPhaseInput devPhase, HttpSession httpSession){
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<DevPhaseInput>> errors = validator.validate(devPhase);
                //Error Handling
                if (errors.size() > 0){
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                } else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return ResponseEntity.status(200).body(devPhaseService.addDevPhase(devPhase, emp_id));
                }
        } else {
            // is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editDevPhaseInfo(@PathVariable String id, @RequestBody DevPhaseInput devPhase, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated){
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<DevPhaseInput>> errors = validator.validate(devPhase);
                //Error Handling
                if (errors.size() > 0){
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                } else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return devPhaseService.editDevPhaseInfo(id, devPhase, emp_id);
                }
        } else {
            // User is not authenticated 
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultipleDevPhase(@RequestParam List<Long> ids, HttpSession httpSession) {
        // Check uf the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                String emp_id = httpSession.getAttribute("session").toString();
            return ResponseEntity.ok().body(devPhaseService.deleteMultipleDevPhase(ids, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteDevPhase(@PathVariable String id, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                String emp_id = httpSession.getAttribute("session").toString();
                return ResponseEntity.ok().body(devPhaseService.logicalDeleteDevPhase(id, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreDevPhase(@PathVariable String id, HttpSession httpSession) {
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                return ResponseEntity.ok().body(devPhaseService.restoreDevPhase(id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error");
            }
        } else {
        // User is not authenticated
        return ResponseEntity.status(401).body("Unauthorized");
        }  
    }
}