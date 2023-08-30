package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import com.controlcenter.controlcenter.model.ProjectStatusInput;
import com.controlcenter.controlcenter.model.ProjectStatusOutput;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProjectStatusDao {
    List<ProjectStatusOutput> getAllProjectStatus();
    void addProjectStatus(ProjectStatusInput projectStatus);
    void editProjectStatus(Map<String, Object> paramMap);
    void logicalDeleteProjectStatus(String id);
    void restoreProjectStatus(String id);
}
