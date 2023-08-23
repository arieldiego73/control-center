package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.Status;

@Mapper
public interface StatusDao {
    List<Status> getAllStatus();
    void addStatus(Status status);
    void editStatusInfo(Map<String, Object> paramMap);
    void logicalDeleteStatus(String code);
}

