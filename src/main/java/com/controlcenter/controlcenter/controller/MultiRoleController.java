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
    public ResponseEntity<List<MultiRoleOutput>> getAllMultiRole(HttpSession httpSession) {
        // Check if the user is authenticated 
         Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
         if (isAuthenticated != null && isAuthenticated) {
             // User is authenticated
            return multiRoleService.getAllMultiRole();
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body(new ArrayList<MultiRoleOutput>());
        }
    }

    @GetMapping("/multi-role-id/{id}")
    public MultiRoleOutput getMultiRoleById(@PathVariable String id) {
        return multiRoleService.getMultiRoleById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addMultiRole(String emp_id, Long role_id, HttpSession httpSession){
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated) {
            try {
                String emp_ID = httpSession.getAttribute("session").toString();
                return ResponseEntity.status(200).body(multiRoleService.addMultiRole(emp_id, role_id, emp_ID));
            } catch (Exception e) {
                return ResponseEntity.status(400).body(e.getMessage());
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editMultiRoleInfo(@PathVariable String id, @RequestBody MultiRoleInput multiRole, HttpSession httpSession) {
        // Check if the user is authenticated
         Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
         if (isAuthenticated != null && isAuthenticated){
             // User is authenticated,  proceed with adding
             //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<MultiRoleInput>> errors = validator.validate(multiRole);
                //Error Handling
                if(errors.size() > 0){
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                } else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return ResponseEntity.status(200).body(multiRoleService.editMultiRoleInfo(id, multiRole, emp_id));
                }
        } else {
            // User is not authenticated 
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteMultiRole(@PathVariable String id, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated) {
            try {
                String emp_id = httpSession.getAttribute("session").toString();
                return ResponseEntity.ok().body(multiRoleService.logicalDeleteMultiRole(id, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
             // User is not authenticated
             return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultipleMultiRole(@RequestParam List<String> ids, HttpSession httpSession) {
        // Check uf the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                String emp_id = httpSession.getAttribute("session").toString();
              return ResponseEntity.ok().body(multiRoleService.deleteMultipleMultiRole(ids, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreMultiRole(@PathVariable String id, HttpSession httpSession) {
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                return ResponseEntity.ok().body(multiRoleService.restoreMultiRole(id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            return ResponseEntity.status(401).body("Unauthorized");
        }        
    }

}
