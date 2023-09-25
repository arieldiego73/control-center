package com.controlcenter.controlcenter.service;

import org.springframework.http.ResponseEntity;

public interface DashboardService {
    
    public ResponseEntity<Integer> countAllOpenProject();
    public ResponseEntity<Integer> countAllCloseProject();
    public ResponseEntity<Integer> countAllCancelledProject();
}
