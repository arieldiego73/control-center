package com.controlcenter.controlcenter.dao;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.UserOutput;

@Mapper
public interface ProfileDao {

    UserOutput getUserById(String emp_id);
    void updateUserPicture(UserOutput userOutput);
}
