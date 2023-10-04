package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.controlcenter.controlcenter.model.ProjectPhaseInput;
import com.controlcenter.controlcenter.model.ProjectPhaseOutput;

public interface ProjectPhaseService {
    public ResponseEntity<List<ProjectPhaseOutput>> getAllProjectPhase();

    public ProjectPhaseOutput getProjectPhaseById(String id);

    public String addProjectPhase(ProjectPhaseInput projectPhase, String emp_id);

    public String editProjectPhase(String id, ProjectPhaseInput projectPhase, String emp_id);

    public String logicalDeleteProjectPhase(String id, String emp_id);

    public String restoreProjectPhase(String id);

    public String deleteMultipleProjectPhase(List<Long> ids, String emp_id);
}
