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
    public List<ProjectPhaseOutput> getAllProjectPhase() {
        return projectPhaseDao.getAllProjectPhase();
    }

    @Override
    public ProjectPhaseOutput getProjectPhaseById(String id) {
        return projectPhaseDao.getProjectPhaseById(id);
    }

    @Override
    public String addProjectPhase(ProjectPhaseInput projectPhase) {
        try {
            projectPhaseDao.addProjectPhase(projectPhase);

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); // current logged user dapat
            activityLogInput.setLog_desc("Added a project phase.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Phase Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editProjectPhase(String id, ProjectPhaseInput projectPhase) {
        ProjectPhaseOutput data = projectPhaseDao.getProjectPhaseById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project Phase with the ID " + id + " has already been deleted.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("projectPhase", projectPhase);

                projectPhaseDao.editProjectPhase(paramMap);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Edited a project phase.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Phase Edited Successfully.";
            }
        } else {
            return "Project Phase with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteProjectPhase(String id) {
        ProjectPhaseOutput data = projectPhaseDao.getProjectPhaseById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project Phase with the ID " + id + " has already been deleted.";
            } else {
                projectPhaseDao.logicalDeleteProjectPhase(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Deleted a project phase.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Phase Deleted Successfully.";
            }
        } else {
            return "Project Phase with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String restoreProjectPhase(String id) {
        ProjectPhaseOutput data = projectPhaseDao.getProjectPhaseById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "Project Phase with the ID " + id + " is not yet deleted.";
            } else {
                projectPhaseDao.restoreProjectPhase(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored a project phase.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Phase Restored Successfully.";
            }
        } else {
            return "Project Phase with the ID " + id + " cannot be found.";
        }
    }
}
