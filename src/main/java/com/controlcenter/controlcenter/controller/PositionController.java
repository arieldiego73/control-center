package com.controlcenter.controlcenter.controller;

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

import com.controlcenter.controlcenter.model.PositionInput;
import com.controlcenter.controlcenter.model.PositionOutput;
import com.controlcenter.controlcenter.service.PositionService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/position")

public class PositionController {
    
    @Autowired
    public PositionService positionService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public ResponseEntity<List<PositionOutput>> getAllPosition() {
        // Check if the user is authenticated 
        // Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        // if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated
            return positionService.getAllPosition();
        // } else {
        //     // User is not authenticated
        //     return ResponseEntity.status(401).body(new ArrayList<PositionOutput>());
        // }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addPosition(@RequestBody PositionInput position) {
        // Check if the user is authenticated
        // Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        // if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<PositionInput>> errors = validator.validate(position);
                //Error Handling
                if(errors.size() > 0){
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                } else{
                    String emp_id = "101"; //httpSession.getAttribute("session").toString();
                    return ResponseEntity.status(200).body(positionService.addPosition(position, emp_id));
                }
        // } else {
        //      // is not authenticated
        //      return ResponseEntity.status(401).body("Unauthorized");
        //     }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editPositionInfo(@PathVariable String id, @RequestBody PositionInput position) {
        // Check if the user is authenticated
        // Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        // if (isAuthenticated != null && isAuthenticated){
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<PositionInput>> errors = validator.validate(position);
                //Error Handling
                if(errors.size() > 0){
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                } else{
                    String emp_id = "101"; //httpSession.getAttribute("session").toString();
                    return ResponseEntity.status(200).body(positionService.editPositionInfo(id, position, emp_id));
                }
        // } else {
        //     // User is not authenticated 
        //     return ResponseEntity.status(401).body("Unauthorized");
        // }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeletePosition(@PathVariable String id) {
        // Check if the user is authenticated
        // Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        // if (isAuthenticated != null && isAuthenticated) {
            try {
                String emp_id = "101"; //httpSession.getAttribute("session").toString();
                return ResponseEntity.ok().body(positionService.logicalDeletePosition(id, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        // } else {
        //   // User is not authenticated
        //   return ResponseEntity.status(401).body("Unauthorized");
        // }
    }

    @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultiplePosition(@RequestParam List<Long> ids) {
         // Check uf the user is authenticated
        //  Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        //  if (isAuthenticated != null && isAuthenticated){
            try {
                String emp_id = "101"; //httpSession.getAttribute("session").toString();
                return ResponseEntity.ok().body(positionService.deleteMultiplePosition(ids, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        // } else {
        //      // User is not authenticated
        //      return ResponseEntity.status(401).body("Unauthorized");
        // }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restorePosition(@PathVariable String id, HttpSession httpSession) {
        // Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        // if (isAuthenticated != null && isAuthenticated){
            try {
                return ResponseEntity.ok().body(positionService.restorePosition(id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        // } else {
        //     return ResponseEntity.status(401).body("Unauthorized");
        // }       
    }
}
