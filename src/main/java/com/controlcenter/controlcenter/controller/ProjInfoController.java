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

import com.controlcenter.controlcenter.model.ProjInfoInput;
import com.controlcenter.controlcenter.model.ProjInfoOutput;
import com.controlcenter.controlcenter.service.ProjInfoService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/proj-info")
public class ProjInfoController {

    @Autowired
    public ProjInfoService projInfoService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public List<ProjInfoOutput> getAllProjInfo() {
        return projInfoService.getAllProjInfo();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProjInfo(@RequestBody ProjInfoInput projInfo){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ProjInfoInput>> errors = validator.validate(projInfo);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(projInfoService.addProjInfo(projInfo));
            }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editProjInfo(@PathVariable String id, @RequestBody ProjInfoInput projInfo) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ProjInfoInput>> errors = validator.validate(projInfo);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(projInfoService.editProjInfo(id, projInfo));
            }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteProjInfo(@PathVariable String id) {
        try {
            return ResponseEntity.ok().body(projInfoService.logicalDeleteProjInfo(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreProjInfo(@PathVariable String id) {
        try {
            return ResponseEntity.ok().body(projInfoService.restoreProjInfo(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }
}

