package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.DevType;



public interface DevTypeService {

    public List<DevType> getAllDevType();
    public String addDevType(DevType devType);
    public String editDevTypeInfo(String id, DevType devType);
    public String logicalDeleteDevType(String id);
    public String restoreDevType(String id);
}