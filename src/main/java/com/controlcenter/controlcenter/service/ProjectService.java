package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.Project;

public interface ProjectService {
    
    public List<Project> getAllProject();
    public String addProject(Project project);
    public String editProjectInfo(String id, Project project);
    public String logicalDeleteProject(String id);
    public String restoreProject(String id);
    
}