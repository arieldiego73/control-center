package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.DevPhase;

public interface DevPhaseService {
    public List<DevPhase> getAllDevPhase();
    public String addDevPhase(DevPhase devphase);
    public String editDevPhaseInfo(String id, DevPhase devphase);
    public String logicalDeleteDevPhase(String id);

    
}
