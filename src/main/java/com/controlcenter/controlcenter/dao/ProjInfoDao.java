package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.controlcenter.controlcenter.model.ProjInfoInput;
import com.controlcenter.controlcenter.model.ProjInfoOutput;

@Mapper
public interface ProjInfoDao {

    List<ProjInfoOutput> getAllProjInfo();

    ProjInfoOutput getProjInfoById(String id);

    void addProjInfo(ProjInfoInput projInfo);

    void editProjInfo(Map<String, Object> paramMap);

    void logicalDeleteProjInfo(String id);

    void restoreProjInfo(String id);

    void deleteMultipleProjInfo(@Param("ids") List<Long> ids);

}