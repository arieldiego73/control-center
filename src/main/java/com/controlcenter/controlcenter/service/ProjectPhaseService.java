package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.ProjectPhase;

public interface ProjectPhaseService {
    public List<ProjectPhase> getAllProjectPhase();
    public String addProjectPhase(ProjectPhase projectPhase);
    public String editProjectPhase(String id, ProjectPhase projectPhase);
    public String logicalDeleteProjectPhase(String id);
    public String restoreProjectPhase(String id);
}
