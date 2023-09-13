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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.ProjectStatusInput;
import com.controlcenter.controlcenter.model.ProjectStatusOutput;
import com.controlcenter.controlcenter.service.ProjectStatusService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/project-status")
public class ProjectStatusController {

    @Autowired
    public ProjectStatusService projectStatusService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public List<ProjectStatusOutput> getAllProjectStatus() {
        return projectStatusService.getAllProjectStatus();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProjectStatus(@RequestBody ProjectStatusInput projectStatus){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ProjectStatusInput>> errors = validator.validate(projectStatus);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(projectStatusService.addProjectStatus(projectStatus));
            }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editProjectStatus(@PathVariable String id, @RequestBody ProjectStatusInput projectStatus) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ProjectStatusInput>> errors = validator.validate(projectStatus);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(projectStatusService.editProjectStatus(id, projectStatus));
            }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteProjectStatus(@PathVariable String id) {
        try {
            return ResponseEntity.ok().body(projectStatusService.logicalDeleteProjectStatus(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }

    @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultiplePosition(@RequestParam List<Long> ids) {
        try {
            return ResponseEntity.ok().body(projectStatusService.deleteMultipleProjectStatus(ids));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreProjectStatus(@PathVariable String id) {
        try {
            return ResponseEntity.ok().body(projectStatusService.restoreProjectStatus(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }
}
