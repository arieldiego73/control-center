package com.controlcenter.controlcenter.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.controlcenter.controlcenter.model.ProjectManagerInput;

@Mapper
public interface ProjectManagerDao {
    void addManagers(ProjectManagerInput projectManager);

    void permaDeleteProjectManager(ProjectManagerInput projectManager);

    void logicalDeleteProjectManager(String id);

    void restoreProjectManager(String id);

    void deleteMultipleProjectManager(@Param("ids") List<Long> ids);
}
