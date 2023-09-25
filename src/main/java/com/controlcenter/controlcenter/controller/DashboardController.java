package com.controlcenter.controlcenter.controller;

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
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/close-project")
    public ResponseEntity<Integer> countAllCloseProject() {
        try {
            return dashboardService.countAllCloseProject();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/cancelled-project")
    public ResponseEntity<Integer> countAllCancelledProject() {
        try {
            return dashboardService.countAllCancelledProject();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
