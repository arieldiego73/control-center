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
    public List<StatusOutput> getAllStatus(){
        return statusService.getAllStatus();
    }

    @GetMapping("/status-code/{id}")
    public StatusOutput getStatusById(@PathVariable String id) {
        return statusService.getStatusById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addStatus(@RequestBody StatusInput status){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<StatusInput>> errors = validator.validate(status);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(statusService.addStatus(status));
            }
    }

    @PutMapping("/edit/{code}")
    public ResponseEntity<String> editStatusInfo(@PathVariable String code, @RequestBody StatusInput status){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<StatusInput>> errors = validator.validate(status);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(statusService.editStatusInfo(code, status));
            }
    }

    @PutMapping("/delete/{code}")
    public String logicalDeleteStatus(@PathVariable String code){
        return statusService.logicalDeleteStatus(code);
    }
    
    @PutMapping("/restore/{code}")
    public String restoreStatus(@PathVariable String code){
        return statusService.restoreStatus(code);
    }
}
