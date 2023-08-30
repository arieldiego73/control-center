package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ProjectTechnologyDao;
import com.controlcenter.controlcenter.model.ProjectTechnologyInput;
import com.controlcenter.controlcenter.model.ProjectTechnologyOutput;
import com.controlcenter.controlcenter.service.ProjectTechnologyService;

@Service
public class ProjectTechnologyImpl implements ProjectTechnologyService {

    @Autowired
    public ProjectTechnologyDao projectTechnologyDao;

    @Override
    public List<ProjectTechnologyOutput> getAllProjectTechnology() {
        return projectTechnologyDao.getAllProjectTechnology();
    };

    @Override
    public String addProjectTechnology(ProjectTechnologyInput projectTechnology){
        try {
            projectTechnologyDao.addProjectTechnology(projectTechnology);
            return "Project Technology Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editProjectTechnology(String id, ProjectTechnologyInput projectTechnology){
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("projectTechnology", projectTechnology);

            projectTechnologyDao.editProjectTechnology(paramMap);

            return "Project Technology Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteProjectTechnology(String id){
        try {
            projectTechnologyDao.logicalDeleteProjectTechnology(id);
            return "Project Technology Deleted Successfully";
            
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreProjectTechnology(String id){
        try {
            projectTechnologyDao.restoreProjectTechnology(id);
            return "Project Technology Restored Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    
}
