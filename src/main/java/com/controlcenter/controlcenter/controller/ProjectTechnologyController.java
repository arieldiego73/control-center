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

import com.controlcenter.controlcenter.model.ProjectTechnologyInput;
import com.controlcenter.controlcenter.model.ProjectTechnologyOutput;
import com.controlcenter.controlcenter.service.ProjectTechnologyService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/project-technology")
public class ProjectTechnologyController {

    @Autowired
    public ProjectTechnologyService projectTechnologyService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public List<ProjectTechnologyOutput> getProjectTechnology(){
        return projectTechnologyService.getAllProjectTechnology();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProjectTechnology(@RequestBody ProjectTechnologyInput projectTechnology){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ProjectTechnologyInput>> errors = validator.validate(projectTechnology);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(projectTechnologyService.addProjectTechnology(projectTechnology));
            }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editProjectTechnology(@PathVariable String id, @RequestBody ProjectTechnologyInput projectTechnology){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ProjectTechnologyInput>> errors = validator.validate(projectTechnology);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(projectTechnologyService.addProjectTechnology(projectTechnology));
            }
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteProjectTechnology(@PathVariable String id){
        return projectTechnologyService.logicalDeleteProjectTechnology(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreProjectTechnology(@PathVariable String id){
        return projectTechnologyService.restoreProjectTechnology(id);
    }
}
