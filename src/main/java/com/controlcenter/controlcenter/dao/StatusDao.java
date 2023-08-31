package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.StatusInput;
import com.controlcenter.controlcenter.model.StatusOutput;

@Mapper
public interface StatusDao {
    List<StatusOutput> getAllStatus();
    void addStatus(StatusInput status);
    void editStatusInfo(Map<String, Object> paramMap);
    void logicalDeleteStatus(String code);
    void restoreStatus(String code);
}

