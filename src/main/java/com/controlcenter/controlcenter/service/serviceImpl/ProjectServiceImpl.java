package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ProjectDao;
import com.controlcenter.controlcenter.model.ProjectInput;
import com.controlcenter.controlcenter.model.ProjectOutput;
import com.controlcenter.controlcenter.service.ProjectService;

@Service
public class ProjectServiceImpl implements ProjectService{
    @Autowired
    public ProjectDao projectDao;

    @Override
    public List<ProjectOutput> getAllProject(){
        return projectDao.getAllProject();
    }
    
    @Override
    public String addProject(ProjectInput project) {
        try {
            projectDao.addProject(project);
            return "Project Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editProjectInfo(String id, ProjectInput project) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("project", project);

            projectDao.editProjectInfo(paramMap);

            return "Project Info Edited Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteProject(String id) {
        try {
        
            projectDao.logicalDeleteProject(id);

            return "Project Deleted Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreProject(String id) {
        try {
            projectDao.restoreProject(id);
            return "Project Restored Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}