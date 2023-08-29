package com.controlcenter.controlcenter.dao;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.ProjInfo;

@Mapper
public interface ProjInfoDao {
    
    List<ProjInfo> getAllProjInfo();
    void addProjInfo(ProjInfo projInfo);
    void editProjInfoInfo(Map<String, Object> paramMap);
    void logicalDeleteProjInfo(String id);

    
}