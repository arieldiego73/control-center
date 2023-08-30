package com.controlcenter.controlcenter.dao;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.DevTypeInput;
import com.controlcenter.controlcenter.model.DevTypeOutput;

@Mapper
public interface DevTypeDao {
    
    List<DevTypeOutput> getAllDevType();
    void addDevType(DevTypeInput devType);
    void editDevTypeInfo(Map<String, Object> paramMap);
    void logicalDeleteDevType(String id);
    void restoreDevType(String id);
    
}