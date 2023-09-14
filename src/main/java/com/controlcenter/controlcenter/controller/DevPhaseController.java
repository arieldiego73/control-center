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

import com.controlcenter.controlcenter.model.DevPhaseInput;
import com.controlcenter.controlcenter.model.DevPhaseOutput;
import com.controlcenter.controlcenter.service.DevPhaseService;
import com.controlcenter.controlcenter.shared.ErrorHandler;


@RestController
@RequestMapping("/dev-phase")
public class DevPhaseController {

    @Autowired
    public DevPhaseService devPhaseService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public ResponseEntity<List<DevPhaseOutput>> getAllDevPhase() {
        return devPhaseService.getAllDevPhase();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addDevPhase(@RequestBody DevPhaseInput devPhase){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<DevPhaseInput>> errors = validator.validate(devPhase);
            //Error Handling
            if (errors.size() > 0){
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else{
                return ResponseEntity.status(200).body(devPhaseService.addDevPhase(devPhase));
            }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editDevPhaseInfo(@PathVariable String id, @RequestBody DevPhaseInput devPhase) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<DevPhaseInput>> errors = validator.validate(devPhase);
            //Error Handling
            if (errors.size() > 0){
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else{
                return ResponseEntity.status(200).body(devPhaseService.editDevPhaseInfo(id, devPhase));
            }
    }

    @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultipleDevPhase(@RequestParam List<Long> ids) {
        try {
            return ResponseEntity.ok().body(devPhaseService.deleteMultipleDevPhase(ids));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error");
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteDevPhase(@PathVariable String id) {
        try {
            return ResponseEntity.ok().body(devPhaseService.logicalDeleteDevPhase(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreDevPhase(@PathVariable String id) {
        try {
            return ResponseEntity.ok().body(devPhaseService.restoreDevPhase(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error");
        }
    }
}