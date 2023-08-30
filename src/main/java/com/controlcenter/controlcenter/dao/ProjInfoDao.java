package com.controlcenter.controlcenter.dao;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.ProjInfoInput;
import com.controlcenter.controlcenter.model.ProjInfoOutput;

@Mapper
public interface ProjInfoDao {
    
    List<ProjInfoOutput> getAllProjInfo();
    void addProjInfo(ProjInfoInput projInfo);
    void editProjInfoInfo(Map<String, Object> paramMap);
    void logicalDeleteProjInfo(String id);

    
}