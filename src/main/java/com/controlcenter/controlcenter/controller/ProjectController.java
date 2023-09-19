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

import com.controlcenter.controlcenter.model.ProjectInput;
import com.controlcenter.controlcenter.model.ProjectOutput;
import com.controlcenter.controlcenter.model.ProjectTable;
import com.controlcenter.controlcenter.service.ProjectService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/project")
public class ProjectController {
    
    @Autowired
    public ProjectService projectService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/project-table")
    public List<ProjectTable> projectTable() {
        return projectService.projectTable();
    }

    @GetMapping("/all")
    public List<ProjectOutput> getAllProject() {
        return projectService.getAllProject();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProject(@RequestBody ProjectInput project, @RequestParam List<Long> dev_phase_ids, @RequestParam List<Long> dev_tech_ids){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ProjectInput>> errors = validator.validate(project);
        System.out.println(dev_phase_ids);
        System.out.println(dev_tech_ids);
            //Error Handling
            if(errors.size() > 0){
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else{
                return ResponseEntity.status(200).body(projectService.addProject(project));   
            }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editProjectInfo(@PathVariable String id, @RequestBody ProjectInput project) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ProjectInput>> errors = validator.validate(project);
            //Error Handling
            if(errors.size() > 0){
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else{
                return ResponseEntity.status(200).body(projectService.editProjectInfo(id, project));
            }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteProject(@PathVariable String id) {
        try {
            return ResponseEntity.ok().body(projectService.logicalDeleteProject(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreProject(@PathVariable String id) {
        try {
            return ResponseEntity.ok().body(projectService.restoreProject(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }
}
