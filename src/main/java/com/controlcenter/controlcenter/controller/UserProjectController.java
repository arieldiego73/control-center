package com.controlcenter.controlcenter.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.UserProjectInput;
import com.controlcenter.controlcenter.model.UserProjectOutput;
import com.controlcenter.controlcenter.service.UserProjectService;
import com.controlcenter.controlcenter.shared.ErrorHandler;
import com.controlcenter.controlcenter.shared.ValidationResponse;

@RestController
@RequestMapping("/user-project")
public class UserProjectController {
    
    @Autowired
    public UserProjectService userProjectService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public ResponseEntity<List<UserProjectOutput>> getAllUserProject() {
        return userProjectService.getAllUserProject();
    }

    @PostMapping("/add")
    public String addUserProject(@RequestBody UserProjectInput userProject){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<UserProjectInput>> errors = validator.validate(userProject);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return errorHandler.getErrors(errors);
            }else{
                return userProjectService.addUserProject(userProject);
            }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<List<UserProjectOutput>> editUserProjectInfo(@PathVariable String id, @RequestBody UserProjectInput userProject) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<UserProjectInput>> errors = validator.validate(userProject);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                List<ConstraintViolation<UserProjectInput>> errorList = new ArrayList<>(errors);
                ValidationResponse<ConstraintViolation<UserProjectInput>> response = new ValidationResponse<>(false, errorList);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }else{
                ResponseEntity<List<UserProjectOutput>> userProjects = userProjectService.getAllUserProject();
                return userProjects;
            }
    }
    @PutMapping("/delete/{id}")
    public String logicalDeleteUserProject(@PathVariable String id) {
        return userProjectService.logicalDeleteUserProject(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreUserProject(@PathVariable String id) {
        return userProjectService.restoreUserProject(id);
    }
}