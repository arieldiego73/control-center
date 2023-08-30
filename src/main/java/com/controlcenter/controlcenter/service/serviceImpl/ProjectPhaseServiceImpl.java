package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ProjectPhaseDao;
import com.controlcenter.controlcenter.model.ProjectPhase;
import com.controlcenter.controlcenter.service.ProjectPhaseService;

@Service
public class ProjectPhaseServiceImpl implements ProjectPhaseService {

    @Autowired
    ProjectPhaseDao projectPhaseDao;

    @Override
    public List<ProjectPhase> getAllProjectPhase(){
        return projectPhaseDao.getAllProjectPhase();
    }

    @Override
    public String addProjectPhase(ProjectPhase projectPhase){
        try {
            projectPhaseDao.addProjectPhase(projectPhase);
            return "Project Phase Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editProjectPhase(String id, ProjectPhase projectPhase){
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("projectPhase", projectPhase);

            projectPhaseDao.editProjectPhase(paramMap);
            return "Project Phase Edited Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteProjectPhase(String id){
        try {
            projectPhaseDao.logicalDeleteProjectPhase(id);
            return "Project Phase Deleted Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreProjectPhase(String id){
        try {
            projectPhaseDao.restoreProjectPhase(id);
            return "Project Phase Restored Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
    
}
