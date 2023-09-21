package com.controlcenter.controlcenter.dao;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.ProjectManagerInput;

@Mapper
public interface ProjectManagerDao {
    void addManagers(ProjectManagerInput projectManager);
    void permaDeleteProjectManager(ProjectManagerInput projectManager);
}
