package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.UserProjectInput;
import com.controlcenter.controlcenter.model.UserProjectOutput;

@Mapper
public interface UserProjectDao {
    List<UserProjectOutput> getAllUserProject();
    UserProjectOutput getUserProjectById(String id);
    void addUserProject(UserProjectInput userProject);
    void editUserProjectInfo(Map<String, Object> paramMap);
    void logicalDeleteUserProject(String id);
    void restoreUserProject(String id);
}
