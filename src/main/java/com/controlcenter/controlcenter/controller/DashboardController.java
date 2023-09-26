package com.controlcenter.controlcenter.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    
    @Autowired
    public DashboardService dashboardService;

    @GetMapping("/open-project")
    public ResponseEntity<Integer> countAllOpenProject() {
        try {
            return dashboardService.countAllOpenProject();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/close-project")
    public ResponseEntity<Integer> countAllCloseProject() {
        try {
            return dashboardService.countAllCloseProject();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/cancelled-project")
    public ResponseEntity<Integer> countAllCancelledProject() {
        try {
            return dashboardService.countAllCancelledProject();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user-count")
    public ResponseEntity<List<Map<String, Object>>> countAllRegisteredUserPerYear() {
        try {
            return dashboardService.countAllRegisteredUserPerYear();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/business-partner")
    public ResponseEntity<Integer> countAllUserWithStatusOfBusinessPartner() {
        try {
            return dashboardService.countAllUserWithStatusOfBusinessPartner();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/intern")
    public ResponseEntity<Integer> countAllUserWithStatusOfIntern() {
        try {
            return dashboardService.countAllUserWithStatusOfIntern();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/regular")
    public ResponseEntity<Integer> countAllUserWithStatusOfRegular() {
        try {
            return dashboardService.countAllUserWithStatusOfRegular();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/trainee")
    public ResponseEntity<Integer> countAllUserWithStatusOfTrainee() {
        try {
            return dashboardService.countAllUserWithStatusOfTrainee();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
