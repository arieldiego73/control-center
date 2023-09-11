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

import com.controlcenter.controlcenter.model.SectionInput;
import com.controlcenter.controlcenter.model.SectionOutput;
import com.controlcenter.controlcenter.service.SectionService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/section")

public class SectionController {
       
    @Autowired
    public SectionService sectionService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public List<SectionOutput> getAllSection() {
        return sectionService.getAllSection();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addSection(@RequestBody SectionInput section){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<SectionInput>> errors = validator.validate(section);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(sectionService.addSection(section));
            }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editSectionInfo(@PathVariable String id, @RequestBody SectionInput section) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<SectionInput>> errors = validator.validate(section);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(sectionService.editSectionInfo(id, section));
            }
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteSection(@PathVariable String id) {
        return sectionService.logicalDeleteSection(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreSection(@PathVariable String id) {
        return sectionService.restoreSection(id);
    }
}
