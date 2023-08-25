package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import com.controlcenter.controlcenter.model.ProjectStatus;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProjectStatusDao {
    List<ProjectStatus> getAllProjectStatus();
    void addProjectStatus(ProjectStatus projectStatus);
    void editProjectStatus(Map<String, Object> paramMap);
    void logicalDeleteProjectStatus(String id);

}
