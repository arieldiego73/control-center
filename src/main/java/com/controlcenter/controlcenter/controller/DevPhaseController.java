package com.controlcenter.controlcenter.controller;

import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.DevPhaseInput;
import com.controlcenter.controlcenter.model.DevPhaseOutput;
import com.controlcenter.controlcenter.service.DevPhaseService;


@RestController
@RequestMapping("/dev-phase")
public class DevPhaseController {

    @Autowired
    public DevPhaseService devPhaseService;

    @GetMapping("/all")
    public List<DevPhaseOutput> getAllDevPhase() {
        return devPhaseService.getAllDevPhase();
    }

    @PostMapping("/add")
    public String addDevPhase(@RequestBody DevPhaseInput devPhase){
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<DevPhaseInput>> errors = validator.validate(devPhase);
            if (errors.size() > 0) { //checks the errors from validator
                StringBuilder errorMessage = new StringBuilder("Error Message/s:\n");
                //loop all the errors encountered then compile them into a string:
                for (ConstraintViolation<DevPhaseInput> violation : errors) {
                    errorMessage.append(violation.getMessage()).append("\n");
                }
                return errorMessage.toString();
            }else{
                return devPhaseService.addDevPhase(devPhase);
            }
    }

    @PutMapping("/edit/{id}")
    public String editDevPhaseInfo(@PathVariable String id, @RequestBody DevPhaseInput devPhase) {
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<DevPhaseInput>> errors = validator.validate(devPhase);
            if (errors.size() > 0) { //checks the errors from validator
                StringBuilder errorMessage = new StringBuilder("Error Message/s:\n");
                //loop all the errors encountered then compile them into a string:
                for (ConstraintViolation<DevPhaseInput> violation : errors) {
                    errorMessage.append(violation.getMessage()).append("\n");
                }
                return errorMessage.toString();
            }else{
                return devPhaseService.editDevPhaseInfo(id, devPhase);
            }
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteDevPhase(@PathVariable String id) {
        return devPhaseService.logicalDeleteDevPhase(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreDevPhase(@PathVariable String id) {
        return devPhaseService.restoreDevPhase(id);
    }
}