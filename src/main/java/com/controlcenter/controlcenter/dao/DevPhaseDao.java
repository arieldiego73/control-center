package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.controlcenter.controlcenter.model.DevPhaseInput;
import com.controlcenter.controlcenter.model.DevPhaseOutput;

@Mapper
public interface DevPhaseDao {
    List<DevPhaseOutput> getAllDevPhase();
    DevPhaseOutput getDevPhaseById(String id);
    void addDevPhase(DevPhaseInput devPhase);
    void editDevPhaseInfo(Map<String, Object> paramMap);
    void logicalDeleteDevPhase(String id);
    void restoreDevPhase(String id);
    void deleteMultipleDevPhase(@Param("ids") List<Long> ids);
    
}
