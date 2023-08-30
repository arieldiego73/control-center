package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.ProjectStatus;

public interface ProjectStatusService {
    public List<ProjectStatus> getAllProjectStatus();
    public String addProjectStatus(ProjectStatus projectStatus);
    public String editProjectStatus(String id, ProjectStatus projectStatus);
    public String logicalDeleteProjectStatus(String id);
    public String restoreProjectStatus(String id);
}
