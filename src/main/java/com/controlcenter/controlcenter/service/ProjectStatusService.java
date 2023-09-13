package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.ProjectStatusInput;
import com.controlcenter.controlcenter.model.ProjectStatusOutput;

public interface ProjectStatusService {
    public List<ProjectStatusOutput> getAllProjectStatus();
    public String addProjectStatus(ProjectStatusInput projectStatus);
    public String editProjectStatus(String id, ProjectStatusInput projectStatus);
    public String logicalDeleteProjectStatus(String id);
    public ResponseEntity<String> deleteMultipleProjectStatus(
        @RequestParam List<Long> ids
    );
    public String restoreProjectStatus(String id);
}
