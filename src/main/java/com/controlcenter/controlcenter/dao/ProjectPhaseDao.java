package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.ProjectPhase;

@Mapper
public interface ProjectPhaseDao {
    List<ProjectPhase> getAllProjectPhase();
    void addProjectPhase(ProjectPhase projectPhase);
    void editProjectPhase(Map<String, Object> paramMap);
    void logicalDeleteProjectPhase(String id);
}
