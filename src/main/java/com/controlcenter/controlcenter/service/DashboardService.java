package com.controlcenter.controlcenter.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface DashboardService {
    
    public ResponseEntity<Integer> countAllOpenProject();
    public ResponseEntity<Integer> countAllCloseProject();
    public ResponseEntity<Integer> countAllCancelledProject();
    public ResponseEntity<List<Map<String, Object>>> countAllRegisteredUserPerYear();
    public ResponseEntity<Integer> countAllUserWithStatusOfBusinessPartner();
    public ResponseEntity<Integer> countAllUserWithStatusOfIntern();
    public ResponseEntity<Integer> countAllUserWithStatusOfRegular();
    public ResponseEntity<Integer> countAllUserWithStatusOfTrainee();
}
