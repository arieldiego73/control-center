package com.controlcenter.controlcenter.controller;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpSession;
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
    public ResponseEntity<List<DepartmentOutput>> getAllDepartment() {
        return departmentService.getAllDepartment();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addDepartment(@RequestBody DepartmentInput department, HttpSession http) {
        // For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<DepartmentInput>> errors = validator.validate(department);
        // Error Handling
        if (errors.size() > 0) {
            return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
        } else {
            String emp_id = http.getAttribute("session").toString();
            return ResponseEntity.status(200).body(departmentService.addDepartment(department, emp_id));
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editDepartmentInfo(@PathVariable String id, @RequestBody DepartmentInput department) {
        // For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<DepartmentInput>> errors = validator.validate(department);
        // Error Handling
        if (errors.size() > 0) {
            return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
        } else {
            return ResponseEntity.status(200).body(departmentService.editDepartmentInfo(id, department));
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteDepartment(@PathVariable String id) {
        try {
            return ResponseEntity.ok().body(departmentService.logicalDeleteDepartment(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }

    @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultipleDepartment(@RequestParam List<Long> ids) {
        try {
            return ResponseEntity.ok().body(departmentService.deleteMultipleDepartment(ids));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreDepartment(@PathVariable String id) {
        try {
            return ResponseEntity.ok().body(departmentService.restoreDepartment(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server Side Error.");
        }
    }
}
