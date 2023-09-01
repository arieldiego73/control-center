package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.ProjectInput;
import com.controlcenter.controlcenter.model.ProjectOutput;

@Mapper
public interface ProjectDao {
    List<ProjectOutput> getAllProject();
    void addProject(ProjectInput project);
    void editProjectInfo(Map<String, Object> paramMap);
    void logicalDeleteProject(String id);
    void restoreProject(String id);
}