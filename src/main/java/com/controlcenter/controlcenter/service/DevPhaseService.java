package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.DevPhaseInput;
import com.controlcenter.controlcenter.model.DevPhaseOutput;

public interface DevPhaseService {
    public ResponseEntity<List<DevPhaseOutput>> getAllDevPhase();
    public DevPhaseOutput getDevPhaseById(String id);
    public String addDevPhase(DevPhaseInput devPhase, String emp_id);
    public ResponseEntity<String> editDevPhaseInfo(String id, DevPhaseInput devPhase, String emp_id);
    public String logicalDeleteDevPhase(String id, String emp_id);
    public String deleteMultipleDevPhase(@RequestParam List<Long> ids, String emp_id);
    public String restoreDevPhase(String id);
    
}
