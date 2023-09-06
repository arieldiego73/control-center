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

import com.controlcenter.controlcenter.model.PositionInput;
import com.controlcenter.controlcenter.model.PositionOutput;
import com.controlcenter.controlcenter.service.PositionService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/position")

public class PositionController {
    
    @Autowired
    public PositionService positionService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public List<PositionOutput> getAllPosition() {
        return positionService.getAllPosition();
    }

    @PostMapping("/add")
    public String addPosition(@RequestBody PositionInput position) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<PositionInput>> errors = validator.validate(position);
            //Error Handling
            if(errors.size() > 0){
                return errorHandler.getErrors(errors);
            } else{
                return positionService.addPosition(position);
            }
    }

    @PutMapping("/edit/{id}")
    public String editPositionInfo(@PathVariable String id, @RequestBody PositionInput position) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<PositionInput>> errors = validator.validate(position);
            //Error Handling
            if(errors.size() > 0){
                return errorHandler.getErrors(errors);
            } else{
                return positionService.editPositionInfo(id, position);
            }
    }

    @PutMapping("/delete/{id}")
    public String logicalDeltePosition(@PathVariable String id) {
        return positionService.logicalDeletePosition(id);
    }

    @PutMapping("/restore/{id}")
    public String restorePosition(@PathVariable String id) {
        return positionService.restorePosition(id);
    }
}
