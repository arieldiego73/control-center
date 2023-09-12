package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.StatusInput;
import com.controlcenter.controlcenter.model.StatusOutput;

public interface StatusService {
    
    public List<StatusOutput> getAllStatus();
    public StatusOutput getStatusById(String id);
    public String addStatus(StatusInput status);
    public String editStatusInfo(String code, StatusOutput status);
    public String logicalDeleteStatus(String code); 
    public String restoreStatus(String code); 
}