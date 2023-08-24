package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.Project;

@Mapper
public interface ProjectDao {
    List<Project> getAllProject();
    void addProject(Project project);
    void editProjectInfo(Map<String, Object> paramMap);
    void logicalDeleteProject(String id);
}
