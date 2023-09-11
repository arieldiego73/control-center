package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.ProjectPhaseDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ProjectPhaseInput;
import com.controlcenter.controlcenter.model.ProjectPhaseOutput;
import com.controlcenter.controlcenter.service.ProjectPhaseService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class ProjectPhaseServiceImpl implements ProjectPhaseService {

    @Autowired
    ProjectPhaseDao projectPhaseDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;
    
    @Override
    public List<ProjectPhaseOutput> getAllProjectPhase(){
        return projectPhaseDao.getAllProjectPhase();
    }

    @Override
    public String addProjectPhase(ProjectPhaseInput projectPhase){
        try {
            projectPhaseDao.addProjectPhase(projectPhase);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Added a project phase.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Phase Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editProjectPhase(String id, ProjectPhaseInput projectPhase){
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("projectPhase", projectPhase);

            projectPhaseDao.editProjectPhase(paramMap);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Edited a project phase.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Phase Edited Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteProjectPhase(String id){
        try {
            projectPhaseDao.logicalDeleteProjectPhase(id);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Deleted a project phase.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Phase Deleted Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreProjectPhase(String id){
        try {
            projectPhaseDao.restoreProjectPhase(id);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Restored a project phase.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Phase Restored Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
    
}
