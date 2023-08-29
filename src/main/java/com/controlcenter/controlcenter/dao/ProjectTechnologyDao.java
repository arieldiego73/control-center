package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.ProjectTechnology;

@Mapper
public interface ProjectTechnologyDao {
    List<ProjectTechnology> getAllProjectTechnology();
    void addProjectTechnology(ProjectTechnology projectTechnology);
    void editProjectTechnology(Map<String, Object> paramMap);
    void logicalDeleteProjectTechnology(String id);
    
}
