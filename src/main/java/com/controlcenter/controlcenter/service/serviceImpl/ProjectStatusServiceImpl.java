package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ProjectStatusDao;
import com.controlcenter.controlcenter.model.ProjectStatus;
import com.controlcenter.controlcenter.service.ProjectStatusService;

@Service
public class ProjectStatusServiceImpl implements ProjectStatusService{
    @Autowired
    public ProjectStatusDao projectStatusDao;

    @Override
    public List<ProjectStatus> getAllProjectStatus(){
        return projectStatusDao.getAllProjectStatus();
    }
    
    @Override
    public String addProjectStatus(ProjectStatus projectStatus) {
        try {
            projectStatusDao.addProjectStatus(projectStatus);
            return "Project Status Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editProjectStatus(String id, ProjectStatus projectStatus) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("projectStatus", projectStatus);

            projectStatusDao.editProjectStatus(paramMap);

            return "Project Status Edited Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteProjectStatus(String id) {
        try {
        
            projectStatusDao.logicalDeleteProjectStatus(id);

            return "Project Status Deleted Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreProjectStatus(String id) {
        try {
        
            projectStatusDao.restoreProjectStatus(id);

            return "Project Status Restored Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
