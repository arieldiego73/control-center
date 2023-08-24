package com.controlcenter.controlcenter.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.PersonalInfo;

@Mapper
public interface PersonalInfoDao {
    List<PersonalInfo> getAllPersonalInfo();
}
