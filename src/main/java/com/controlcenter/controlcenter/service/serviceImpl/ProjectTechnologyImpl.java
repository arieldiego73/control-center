package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.ProjectTechnologyDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ProjectTechnologyInput;
import com.controlcenter.controlcenter.model.ProjectTechnologyOutput;
import com.controlcenter.controlcenter.service.ProjectTechnologyService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class ProjectTechnologyImpl implements ProjectTechnologyService {

    @Autowired
    public ProjectTechnologyDao projectTechnologyDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Override
    public List<ProjectTechnologyOutput> getAllProjectTechnology() {
        return projectTechnologyDao.getAllProjectTechnology();
    };

    @Override
    public String addProjectTechnology(ProjectTechnologyInput projectTechnology){
        try {
            projectTechnologyDao.addProjectTechnology(projectTechnology);
            
            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Added a project technology.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

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

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Edited a project technology.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Technology Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteProjectTechnology(String id){
        try {
            projectTechnologyDao.logicalDeleteProjectTechnology(id);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Deleted a project technology.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Technology Deleted Successfully";
            
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreProjectTechnology(String id){
        try {
            projectTechnologyDao.restoreProjectTechnology(id);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Restored a project technology.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Technology Restored Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    
}
