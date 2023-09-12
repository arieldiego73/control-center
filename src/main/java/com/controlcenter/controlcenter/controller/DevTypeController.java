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

import com.controlcenter.controlcenter.model.DevTypeInput;
import com.controlcenter.controlcenter.model.DevTypeOutput;
import com.controlcenter.controlcenter.service.DevTypeService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/dev-type")
public class DevTypeController {
    
    @Autowired
    public DevTypeService devTypeService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public List<DevTypeOutput> getAllDevType() {
        return devTypeService.getAllDevType();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addDevType(@RequestBody DevTypeInput devType){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<DevTypeInput>> errors = validator.validate(devType);
            //Error Handling
            if(errors.size() > 0){
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else{
                return ResponseEntity.status(200).body(devTypeService.addDevType(devType));
            }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editDevTypeInfo(@PathVariable String id, @RequestBody DevTypeInput devType) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<DevTypeInput>> errors = validator.validate(devType);
            //Error Handling
            if(errors.size() > 0){
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else{
                return ResponseEntity.status(200).body(devTypeService.editDevTypeInfo(id, devType));
            }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteDevType(@PathVariable String id) {
        return ResponseEntity.ok().body(devTypeService.logicalDeleteDevType(id));
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreDevType(@PathVariable String id) {
        return ResponseEntity.ok().body(devTypeService.restoreDevType(id));
    }
}
