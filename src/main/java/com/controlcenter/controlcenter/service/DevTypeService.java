package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.DevType;



public interface DevTypeService {

    public List<DevType> getAllDevType();
    public String addDevType(DevType devtype);
    public String editDevTypeInfo(String id, DevType devtype);
    public String logicalDeleteDevType(String id);

    
}