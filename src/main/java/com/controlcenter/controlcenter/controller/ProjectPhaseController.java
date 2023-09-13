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
    public List<ProjectPhaseOutput> getAllProjectPhase(){
        return projectPhaseService.getAllProjectPhase();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProjectPhase(@RequestBody ProjectPhaseInput projectPhase){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ProjectPhaseInput>> errors = validator.validate(projectPhase);
            //Error Handling
            if(errors.size() > 0){
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else{
                return ResponseEntity.status(200).body(projectPhaseService.addProjectPhase(projectPhase));   
            }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editProjectPhase(@PathVariable String id, @RequestBody ProjectPhaseInput projectPhase){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ProjectPhaseInput>> errors = validator.validate(projectPhase);
            //Error Handling
            if(errors.size() > 0){
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else{
                return ResponseEntity.status(200).body(projectPhaseService.editProjectPhase(id, projectPhase));   
            }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteProjectPhase(@PathVariable String id){
        try {
            return ResponseEntity.ok().body(projectPhaseService.logicalDeleteProjectPhase(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreProjectPhase(@PathVariable String id){
        try {
            return ResponseEntity.ok().body(projectPhaseService.restoreProjectPhase(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }
    
}
