package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.DevPhaseInput;
import com.controlcenter.controlcenter.model.DevPhaseOutput;

public interface DevPhaseService {
    public ResponseEntity<List<DevPhaseOutput>> getAllDevPhase();
    public String addDevPhase(DevPhaseInput devPhase);
    public String editDevPhaseInfo(String id, DevPhaseInput devPhase);
    public ResponseEntity<String> logicalDeleteDevPhase(String id);
    public ResponseEntity<String> deleteMultipleDevPhase(
        @RequestParam List<Long> ids
    );
    public String restoreDevPhase(String id);
    
}
