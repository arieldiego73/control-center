package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.controlcenter.controlcenter.model.ProjectTechnologyInput;
import com.controlcenter.controlcenter.model.ProjectTechnologyOutput;

public interface ProjectTechnologyService {
    public ResponseEntity<List<ProjectTechnologyOutput>> getAllProjectTechnology();

    public ProjectTechnologyOutput getProjectTechnologyById(String id);

    public String addProjectTechnology(ProjectTechnologyInput projectTechnology, String emp_id);

    public String editProjectTechnology(String id, ProjectTechnologyInput projectTechnology, String emp_id);

    public String logicalDeleteProjectTechnology(String id, String emp_id);

    public String restoreProjectTechnology(String id, String emp_id);

    public String deleteMultipleProjectTechnology(List<Long> ids, String emp_id);
}
