package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.ProjectTechnology;

public interface ProjectTechnologyService {
    public List<ProjectTechnology> getAllProjectTechnology();
    public String addProjectTechnology(ProjectTechnology projectTechnology);
    public String editProjectTechnology(String id, ProjectTechnology projectTechnology);
    public String logicalDeleteProjectTechnology(String id);
    public String restoreProjectTechnology(String id);
}
