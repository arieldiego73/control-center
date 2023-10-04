package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.controlcenter.controlcenter.model.PersonalInfoInput;
import com.controlcenter.controlcenter.model.PersonalInfoOutput;

@Mapper
public interface PersonalInfoDao {
    List<PersonalInfoOutput> getAllPersonalInfo();

    PersonalInfoOutput getPersonalInfoById(String id);

    void addPersonalInfo(PersonalInfoInput personalInfo);

    void editPersonalInfo(Map<String, Object> paramMap);

    void logicalDeletePersonalInfo(String id);

    void restorePersonalInfo(String id);

    void deleteMultiplePersonalInfo(@Param("ids") List<String> ids);
  
}
