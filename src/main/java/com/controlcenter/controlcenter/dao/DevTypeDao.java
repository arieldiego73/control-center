package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.controlcenter.controlcenter.model.DevTypeInput;
import com.controlcenter.controlcenter.model.DevTypeOutput;

@Mapper
public interface DevTypeDao {

    List<DevTypeOutput> getAllDevType();

    DevTypeOutput getDevTypeById(String id);

    void addDevType(DevTypeInput devType);

    void editDevTypeInfo(Map<String, Object> paramMap);

    void logicalDeleteDevType(String id);

    void deleteMultipleDevType(@Param("ids") List<Long> ids);

    void restoreDevType(String id);

}