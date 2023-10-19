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

import com.controlcenter.controlcenter.model.StatusInput;
import com.controlcenter.controlcenter.model.StatusOutput;
import com.controlcenter.controlcenter.service.StatusService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/status")
public class StatusController {

    @Autowired
    public StatusService statusService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public ResponseEntity<List<StatusOutput>> getAllStatus(HttpSession httpSession) {
        // Check if the user is authenticated 
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated
            return statusService.getAllStatus();
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body(new ArrayList<StatusOutput>());
        }
    }

    @GetMapping("/status-code/{id}")
    public StatusOutput getStatusById(@PathVariable String id, HttpSession httpSession) {
        // Check if the user is authenticated 
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated
            return statusService.getStatusById(id);
        } else {
            // User is not authenticated
            return null;
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addStatus(@RequestBody StatusInput status, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<StatusInput>> errors = validator.validate(status);
            // Error Handling
            if (errors.size() > 0) { // checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else {
                String emp_id = httpSession.getAttribute("session").toString();
                return ResponseEntity.status(200).body(statusService.addStatus(status, emp_id));
            }
        } else {
            // is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/edit/{code}")
    public ResponseEntity<String> editStatusInfo(@PathVariable String code, @RequestBody StatusOutput status, HttpSession httpSession) {
         // Check if the user is authenticated
         Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
         if (isAuthenticated != null && isAuthenticated){
             // User is authenticated,  proceed with adding
             // For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<StatusOutput>> errors = validator.validate(status);
            // Error Handling
            if (errors.size() > 0) { // checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else {
                String emp_id = httpSession.getAttribute("session").toString();
                return statusService.editStatusInfo(code, status, emp_id);
            }
        } else {
            // User is not authenticated 
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete/{code}")
    public ResponseEntity<String> logicalDeleteStatus(@PathVariable String code, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated) {
            try {
                String emp_id = httpSession.getAttribute("session").toString();
                return ResponseEntity.ok().body(statusService.logicalDeleteStatus(code, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultipleStatus(@RequestParam List<String> ids, HttpSession httpSession) {
        // Check uf the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                String emp_id = httpSession.getAttribute("session").toString();
                return ResponseEntity.ok().body(statusService.deleteMultipleStatus(ids, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/restore/{code}")
    public ResponseEntity<String> restoreStatus(@PathVariable String code, HttpSession httpSession) {
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                return ResponseEntity.ok().body(statusService.restoreStatus(code));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }
}
