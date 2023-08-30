package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.ProjectTechnologyInput;
import com.controlcenter.controlcenter.model.ProjectTechnologyOutput;

public interface ProjectTechnologyService {
    public List<ProjectTechnologyOutput> getAllProjectTechnology();
    public String addProjectTechnology(ProjectTechnologyInput projectTechnology);
    public String editProjectTechnology(String id, ProjectTechnologyInput projectTechnology);
    public String logicalDeleteProjectTechnology(String id);
    public String restoreProjectTechnology(String id);
}
