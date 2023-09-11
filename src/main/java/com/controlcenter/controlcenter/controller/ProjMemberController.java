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

import com.controlcenter.controlcenter.model.ProjMemberInput;
import com.controlcenter.controlcenter.model.ProjMemberOutput;
import com.controlcenter.controlcenter.service.ProjMemberService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/proj-member")
public class ProjMemberController {

    @Autowired
    public ProjMemberService projMemberService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public List<ProjMemberOutput> getAllProjMember() {
        return projMemberService.getAllProjMember();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProjMember(@RequestBody ProjMemberInput projMember){
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ProjMemberInput>> errors = validator.validate(projMember);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(projMemberService.addProjMember(projMember));
            }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editProjMemberInfo(@PathVariable String id, @RequestBody ProjMemberInput projMember) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ProjMemberInput>> errors = validator.validate(projMember);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(projMemberService.editProjMemberInfo(id, projMember));
            }
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteProjMember(@PathVariable String id) {
        return projMemberService.logicalDeleteProjMember(id);
    }
    
    @PutMapping("/restore/{id}")
    public String restoreProjMember(@PathVariable String id) {
        return projMemberService.restoreProjMember(id);
    }
}

