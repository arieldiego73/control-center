package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.DevPhaseInput;
import com.controlcenter.controlcenter.model.DevPhaseOutput;

public interface DevPhaseService {
    public List<DevPhaseOutput> getAllDevPhase();
    public String addDevPhase(DevPhaseInput devPhase);
    public String editDevPhaseInfo(String id, DevPhaseOutput devPhase);
    public String logicalDeleteDevPhase(String id);
    public String restoreDevPhase(String id);
    
}
