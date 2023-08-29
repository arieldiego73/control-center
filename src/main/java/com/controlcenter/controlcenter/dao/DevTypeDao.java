package com.controlcenter.controlcenter.dao;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.DevType;

@Mapper
public interface DevTypeDao {
    
    List<DevType> getAllDevType();
    void addDevType(DevType devType);
    void editDevTypeInfo(Map<String, Object> paramMap);
    void logicalDeleteDevType(String id);

    
}