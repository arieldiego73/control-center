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

import com.controlcenter.controlcenter.model.PersonalInfoInput;
import com.controlcenter.controlcenter.model.PersonalInfoOutput;
import com.controlcenter.controlcenter.service.PersonalInfoService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/personal-info")
public class PersonalInfoController {
    
    @Autowired  
    public PersonalInfoService personalInfoService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public List<PersonalInfoOutput> getAllPersonalInfo() {
        return personalInfoService.getAllPersonalInfo();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addPersonalInfo(@RequestBody PersonalInfoInput personalInfo) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<PersonalInfoInput>> errors = validator.validate(personalInfo);
            //Error Handling
            if(errors.size() > 0){
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else{
                return ResponseEntity.status(200).body(personalInfoService.addPersonalInfo(personalInfo));
            }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editPersonalInfo(@PathVariable String id, @RequestBody PersonalInfoInput personalInfo) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<PersonalInfoInput>> errors = validator.validate(personalInfo);
            //Error Handling
            if(errors.size() > 0){
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else{
                return ResponseEntity.status(200).body(personalInfoService.editPersonalInfo(id, personalInfo));
            }
    }

    @PutMapping("delete/{id}")
    public String logicalDeletePersonalInfo(@PathVariable String id) {
        return personalInfoService.logicalDeletePersonalInfo(id);
    }

    @PutMapping("restore/{id}")
    public String restorePersonalInfo(@PathVariable String id) {
        return personalInfoService.restorePersonalInfo(id);
    }
}
