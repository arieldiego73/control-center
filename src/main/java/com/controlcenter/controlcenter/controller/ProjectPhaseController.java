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

import com.controlcenter.controlcenter.model.ProjectPhaseInput;
import com.controlcenter.controlcenter.model.ProjectPhaseOutput;
import com.controlcenter.controlcenter.service.ProjectPhaseService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/project-phase")
public class ProjectPhaseController {
    
    @Autowired
    ProjectPhaseService projectPhaseService;

    @Autowired
    ErrorHandler errorHandler;

    @GetMapping("/all")
    public ResponseEntity<List<ProjectPhaseOutput>> getAllProjectPhase(HttpSession httpSession){
         // Check if the user is authenticated 
         Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
         if (isAuthenticated != null && isAuthenticated) {
             // User is authenticated
            return projectPhaseService.getAllProjectPhase();
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body(new ArrayList<ProjectPhaseOutput>());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProjectPhase(ProjectPhaseInput projectPhase, HttpSession httpSession){
          // Check if the user is authenticated
          Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

          if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<ProjectPhaseInput>> errors = validator.validate(projectPhase);
                //Error Handling
                if(errors.size() > 0){
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                } else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return ResponseEntity.status(200).body(projectPhaseService.addProjectPhase(projectPhase, emp_id));   
                }
        } else {
            // is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editProjectPhase(@PathVariable String id, @RequestBody ProjectPhaseInput projectPhase, HttpSession httpSession){
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated){
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<ProjectPhaseInput>> errors = validator.validate(projectPhase);
                //Error Handling
                if(errors.size() > 0){
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                } else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return ResponseEntity.status(200).body(projectPhaseService.editProjectPhase(id, projectPhase, emp_id));   
                }
        } else {
             // User is not authenticated 
             return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteProjectPhase(@PathVariable String id, HttpSession httpSession){
         // Check if the user is authenticated
         Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

         if (isAuthenticated != null && isAuthenticated) {
            try {
                String emp_id = httpSession.getAttribute("session").toString();
                return ResponseEntity.ok().body(projectPhaseService.logicalDeleteProjectPhase(id, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
             // User is not authenticated
             return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultipleProjectPhase(@RequestParam List<Long> ids, HttpSession httpSession) {
        // Check uf the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                String emp_id = httpSession.getAttribute("session").toString();
            return ResponseEntity.ok().body(projectPhaseService.deleteMultipleProjectPhase(ids, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreProjectPhase(@PathVariable String id, HttpSession httpSession){
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                return ResponseEntity.ok().body(projectPhaseService.restoreProjectPhase(id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            return ResponseEntity.status(401).body("Unauthorized");
        }      
    }
    
}
