package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.controlcenter.controlcenter.model.ProjectInput;
import com.controlcenter.controlcenter.model.ProjectOutput;
import com.controlcenter.controlcenter.model.ProjectTable;

public interface ProjectService {
    
    public ResponseEntity<List<ProjectTable>> projectTable();
    public ResponseEntity<List<ProjectOutput>> getAllProject();
    public ProjectOutput getProjectById(String id);
    public String addProject(ProjectOutput project, String emp_id, List<String> manager_ids, List<Long> client_ids, Long type_id, List<Long> phase_ids, List<Long> tech_ids, List<String> member_ids);
    public String editProjectInfo(String id, ProjectInput project, String emp_id);
    public String logicalDeleteProject(String id, String emp_id);
    public String restoreProject(String id);
    
}