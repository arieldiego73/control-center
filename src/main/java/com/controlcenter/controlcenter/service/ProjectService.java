package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.ProjectInput;
import com.controlcenter.controlcenter.model.ProjectOutput;

public interface ProjectService {
    
    public List<ProjectOutput> getAllProject();
    public ProjectOutput getProjectById(String id);
    public String addProject(ProjectInput project);
    public String editProjectInfo(String id, ProjectInput project);
    public String logicalDeleteProject(String id);
    public String restoreProject(String id);
    
}