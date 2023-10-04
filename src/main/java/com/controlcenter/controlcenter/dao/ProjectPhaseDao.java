package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.controlcenter.controlcenter.model.ProjectPhaseInput;
import com.controlcenter.controlcenter.model.ProjectPhaseOutput;

@Mapper
public interface ProjectPhaseDao {
    List<ProjectPhaseOutput> getAllProjectPhase();

    ProjectPhaseOutput getProjectPhaseById(String id);

    void addProjectPhase(ProjectPhaseInput projectPhase);

    void editProjectPhase(Map<String, Object> paramMap);

    void logicalDeleteProjectPhase(String id);

    void restoreProjectPhase(String id);

    void permaDeleteProjectPhase(ProjectPhaseInput projectPhase);

    void deleteMultipleProjectPhase(@Param("ids") List<Long> ids);
}
