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
    public ResponseEntity<String> addProject(ProjectOutput project, String emp_id, List<String> manager_ids, Long client_id, Long type_id, List<Long> phase_ids, List<Long> tech_ids, Long project_status_id, List<String> member_ids);
    public ResponseEntity<String> editProjectInfo(String id, ProjectInput project, String emp_id, List<String> manager_ids, Long client_id, Long type_id, List<Long> phase_ids, List<Long> tech_ids, Long project_status_id, List<String> member_ids);
    public String logicalDeleteProject(String id, String emp_id);
    public String restoreProject(String id);
    
}