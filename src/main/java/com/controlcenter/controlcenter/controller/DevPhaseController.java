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
    public ResponseEntity<List<DevPhaseOutput>> addDevPhase(@RequestBody DevPhaseInput devPhase){
        return devPhaseService.addDevPhase(devPhase);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<List<DevPhaseOutput>> editDevPhaseInfo(@PathVariable String id, @RequestBody DevPhaseInput devPhase) {
        return devPhaseService.editDevPhaseInfo(id, devPhase);
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<List<DevPhaseOutput>> logicalDeleteDevPhase(@PathVariable String id) {
        return devPhaseService.logicalDeleteDevPhase(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreDevPhase(@PathVariable String id) {
        return devPhaseService.restoreDevPhase(id);
    }
}