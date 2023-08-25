package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.DevPhase;

@Mapper
public interface DevPhaseDao {
    List<DevPhase> getAllDevPhase();
    void addDevPhase(DevPhase devphase);
    void editDevPhaseInfo(Map<String, Object> paramMap);
    void logicalDeleteDevPhase(String id);

    
}
