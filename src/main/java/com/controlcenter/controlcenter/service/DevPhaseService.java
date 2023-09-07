package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.DevPhaseInput;
import com.controlcenter.controlcenter.model.DevPhaseOutput;

public interface DevPhaseService {
    public ResponseEntity<List<DevPhaseOutput>> getAllDevPhase();
    public ResponseEntity<List<DevPhaseOutput>> addDevPhase(DevPhaseInput devPhase);
    public ResponseEntity<List<DevPhaseOutput>> editDevPhaseInfo(String id, DevPhaseInput devPhase);
    public ResponseEntity<List<DevPhaseOutput>> logicalDeleteDevPhase(String id);
    public ResponseEntity<List<DevPhaseOutput>> deleteMultipleDevPhase(
        @RequestParam List<Long> ids
    );
    public String restoreDevPhase(String id);
    
}
