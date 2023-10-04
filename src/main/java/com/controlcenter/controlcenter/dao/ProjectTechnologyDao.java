package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.controlcenter.controlcenter.model.ProjectTechnologyInput;
import com.controlcenter.controlcenter.model.ProjectTechnologyOutput;

@Mapper
public interface ProjectTechnologyDao {
    List<ProjectTechnologyOutput> getAllProjectTechnology();

    ProjectTechnologyOutput getProjectTechnologyById(String id);

    void addProjectTechnology(ProjectTechnologyInput projectTechnology);

    void editProjectTechnology(Map<String, Object> paramMap);

    void logicalDeleteProjectTechnology(String id);

    void restoreProjectTechnology(String id);

    void permaDeleteProjectTechnology(ProjectTechnologyInput projectTechnology);

    void deleteMultipleProjectTechnology(@Param("ids") List<Long> ids);
}
