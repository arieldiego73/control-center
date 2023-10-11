package com.controlcenter.controlcenter.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.controlcenter.controlcenter.model.ProjectInput;
import com.controlcenter.controlcenter.model.ProjectOutput;
import com.controlcenter.controlcenter.model.ProjectTable;

public interface ProjectService {

    public ResponseEntity<List<ProjectTable>> projectTable();

    // get all managers of a project
    public ResponseEntity<List<Map<String, Object>>> getAllManagersOfProject(String proj_id);

    // get all development phases of a project
    public ResponseEntity<List<Map<Long, Object>>> getAllPhasesOfProject(String proj_id);

    // get all members of a project
    public ResponseEntity<List<Map<String, Object>>> getAllMembersOfProject(String proj_id);

    // get all development technologies of a project
    public ResponseEntity<List<Map<Long, Object>>> getAllTechnologiesOfProject(String proj_id);

    // get the client of a project
    public ResponseEntity<List<Map<Long, Object>>> getClientOfProject(String proj_id);

    // get the development type of a project
    public ResponseEntity<List<Map<Long, Object>>> getDevelopmentTypeOfProject(String proj_id);

    // get the status of a project
    public ResponseEntity<List<Map<Long, Object>>> getStatusOfProject(String proj_id);

    // get the attributes of a project
    public ResponseEntity<Map<String, Object>> getAttributesOfProject(String proj_id);

    public ResponseEntity<List<ProjectOutput>> getAllProject();

    public ProjectOutput getProjectById(String id);

    public ResponseEntity<String> addProject(ProjectOutput project, String emp_id, List<String> manager_ids,
            Long client_id, Long type_id, List<Long> phase_ids, List<Long> tech_ids, Long project_status_id,
            List<String> member_ids);

    public ResponseEntity<String> editProjectInfo(String id, ProjectInput project, String emp_id,
            List<String> manager_ids, Long client_id, Long type_id, List<Long> phase_ids, List<Long> tech_ids,
            Long project_status_id, List<String> member_ids);

    public String logicalDeleteProject(String id, String emp_id);

    public String deleteMultipleProject(List<Long> ids, String emp_id);

    public String restoreProject(String id);

}