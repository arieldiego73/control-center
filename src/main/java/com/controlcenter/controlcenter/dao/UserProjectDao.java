package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.UserProject;

@Mapper
public interface UserProjectDao {
    List<UserProject> getAllUserProject();
    void addUserProject(UserProject userProject);
    void editUserProjectInfo(Map<String, Object> paramMap);
    void logicalDeleteUserProject(String id);
}
