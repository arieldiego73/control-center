package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.PersonalInfo;

@Mapper
public interface PersonalInfoDao {
    List<PersonalInfo> getAllPersonalInfo();
    void addPersonalInfo(PersonalInfo personalInfo);
    void editPersonalInfo(Map<String, Object> paramMap);
    void logicalDeletePersonalInfo(String id);
    void restorePersonalInfo(String id);
}
