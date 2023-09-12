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

import com.controlcenter.controlcenter.model.TechnologyInput;
import com.controlcenter.controlcenter.model.TechnologyOutput;
import com.controlcenter.controlcenter.service.TechnologyService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/technology")
public class TechnologyController {
    
    @Autowired
    public TechnologyService technologyService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public List<TechnologyOutput> getAllTechnology() {
        return technologyService.getAllTechnology();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addTechnology(@RequestBody TechnologyInput technology) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<TechnologyInput>> errors = validator.validate(technology);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(technologyService.addTechnology(technology));
            }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editTechnology(@PathVariable String id, @RequestBody TechnologyInput technology) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<TechnologyInput>> errors = validator.validate(technology);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(technologyService.editTechnology(id, technology));
            }
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteTechnology(@PathVariable String id) {
        return technologyService.logicalDeleteTechnology(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreTechnology(@PathVariable String id) {
        return technologyService.restoreTechnology(id);
    }
}
