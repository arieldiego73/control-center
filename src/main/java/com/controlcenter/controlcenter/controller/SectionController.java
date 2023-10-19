package com.controlcenter.controlcenter.controller;

import java.util.ArrayList;
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
    public ResponseEntity<List<SectionOutput>> getAllSection(HttpSession httpSession) {
        // Check if the user is authenticated 
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated
            return sectionService.getAllSection();
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body(new ArrayList<SectionOutput>());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addSection(@RequestBody SectionInput section, HttpSession httpSession){
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<SectionInput>> errors = validator.validate(section);
                //Error Handling
                if (errors.size() > 0) { //checks the errors from validator
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                }else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return ResponseEntity.status(200).body(sectionService.addSection(section, emp_id));
                }
        } else {
            // is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editSectionInfo(@PathVariable String id, @RequestBody SectionInput section, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated){
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<SectionInput>> errors = validator.validate(section);
                //Error Handling
                if (errors.size() > 0) { //checks the errors from validator
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                }else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return sectionService.editSectionInfo(id, section, emp_id);
                }
        } else {
            // User is not authenticated 
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteSection(@PathVariable String id, HttpSession httpSession) {
         // Check if the user is authenticated
         Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

         if (isAuthenticated != null && isAuthenticated) {
             try {
                String emp_id = httpSession.getAttribute("session").toString();
                return ResponseEntity.ok().body(sectionService.logicalDeleteSection(id, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultipleSection(@RequestParam List<Long> ids, HttpSession httpSession) {
       // Check uf the user is authenticated
       Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

       if (isAuthenticated != null && isAuthenticated){
           try {
                String emp_id = httpSession.getAttribute("session").toString();
                return ResponseEntity.ok().body(sectionService.deleteMultipleSection(ids, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
         // User is not authenticated
         return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreSection(@PathVariable String id, HttpSession httpSession) {
        // Check uf the user is authenticated
       Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

       if (isAuthenticated != null && isAuthenticated){
            try {
                return ResponseEntity.ok().body(sectionService.restoreSection(id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
          // User is not authenticated
         return ResponseEntity.status(401).body("Unauthorized");
        }
    }
}
