package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.DevTypeInput;
import com.controlcenter.controlcenter.model.DevTypeOutput;



public interface DevTypeService {

    public List<DevTypeOutput> getAllDevType();
    public DevTypeOutput getDevTypeById(String id);
    public String addDevType(DevTypeInput devType);
    public String editDevTypeInfo(String id, DevTypeInput devType);
    public String logicalDeleteDevType(String id);
    public String restoreDevType(String id);
}