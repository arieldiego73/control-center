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

import com.controlcenter.controlcenter.model.DepartmentInput;
import com.controlcenter.controlcenter.model.DepartmentOutput;
import com.controlcenter.controlcenter.service.DepartmentService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/department")
public class DepartmentController {
    
    @Autowired
    public DepartmentService departmentService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public List<DepartmentOutput> getAllDepartment() {
        return departmentService.getAllDepartment();
    }

    @PostMapping("/add")
    public String addDepartment(@RequestBody DepartmentInput department) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<DepartmentInput>> errors = validator.validate(department);
            //Error Handling
            if (errors.size() > 0){
                return errorHandler.getErrors(errors);
            } else{
                return departmentService.addDepartment(department);
            }
    }

    @PutMapping("/edit/{id}")
    public String editDepartmentInfo(@PathVariable String id, @RequestBody DepartmentInput department) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<DepartmentInput>> errors = validator.validate(department);
            //Error Handling
            if (errors.size() > 0){
                return errorHandler.getErrors(errors);
            } else{
                return departmentService.editDepartmentInfo(id, department);
            }
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteDepartment(@PathVariable String id) {
        return departmentService.logicalDeleteDepartment(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreDepartment(@PathVariable String id) {
        return departmentService.restoreDepartment(id);
    }
}
