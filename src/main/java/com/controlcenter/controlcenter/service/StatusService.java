package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.Status;

public interface StatusService {
    
    public List<Status> getAllStatus();
    public String addStatus(Status status);
    public String editStatusInfo(String code, Status status);
    public String logicalDeleteStatus(String code);

    
}