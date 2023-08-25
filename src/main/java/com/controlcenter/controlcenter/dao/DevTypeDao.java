package com.controlcenter.controlcenter.dao;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.DevType;

@Mapper
public interface DevTypeDao {
    
    List<DevType> getAllDevType();
    void addDevType(DevType devtype);
    void editDevTypeInfo(Map<String, Object> paramMap);
    void logicalDeleteDevType(String id);

    
}