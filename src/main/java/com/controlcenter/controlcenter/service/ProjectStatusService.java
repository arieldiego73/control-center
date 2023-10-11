package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.ProjectStatusInput;
import com.controlcenter.controlcenter.model.ProjectStatusOutput;

public interface ProjectStatusService {
    public ResponseEntity<List<ProjectStatusOutput>> getAllProjectStatus();

    public ProjectStatusOutput getProjectStatusById(String id);

    public String addProjectStatus(ProjectStatusInput projectStatus, String emp_id);

    public ResponseEntity<String> editProjectStatus(String id, ProjectStatusInput projectStatus, String emp_id);

    public String logicalDeleteProjectStatus(String id, String emp_id);

    public String deleteMultipleProjectStatus(@RequestParam List<Long> ids, String emp_id);
 
    public String restoreProjectStatus(String id);
}
