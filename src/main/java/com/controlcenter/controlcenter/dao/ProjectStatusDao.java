package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import com.controlcenter.controlcenter.model.ProjectStatusInput;
import com.controlcenter.controlcenter.model.ProjectStatusOutput;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ProjectStatusDao {
    List<ProjectStatusOutput> getAllProjectStatus();

    ProjectStatusOutput getProjectStatusById(String id);

    void addProjectStatus(ProjectStatusInput projectStatus);

    void editProjectStatus(Map<String, Object> paramMap);

    void logicalDeleteProjectStatus(String id);

    void deleteMultipleProjectStatus(@Param("ids") List<Long> ids);

    void restoreProjectStatus(String id);
}
