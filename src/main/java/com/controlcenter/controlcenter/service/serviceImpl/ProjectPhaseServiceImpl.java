package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<ProjectPhaseOutput>> getAllProjectPhase() {
        return ResponseEntity.ok(projectPhaseDao.getAllProjectPhase());
    }

    @Override
    public ProjectPhaseOutput getProjectPhaseById(String id) {
        return projectPhaseDao.getProjectPhaseById(id);
    }

    @Override
    public String addProjectPhase(ProjectPhaseInput projectPhase, String emp_id) {
        try {
            projectPhaseDao.addProjectPhase(projectPhase);

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); // current logged user dapat
            activityLogInput.setLog_desc("Added a Project Phase.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Phase added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editProjectPhase(String id, ProjectPhaseInput projectPhase, String emp_id) {
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

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Edited a Project Phase.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Phase edited successfully.";
            }
        } else {
            return "Project Phase with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteProjectPhase(String id, String emp_id) {
        ProjectPhaseOutput data = projectPhaseDao.getProjectPhaseById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project Phase with the ID " + id + " has already been deleted.";
            } else {
                projectPhaseDao.logicalDeleteProjectPhase(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Deleted a Project Phase.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Phase deleted successfully.";
            }
        } else {
            return "Project Phase with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String deleteMultipleProjectPhase(List<Long> ids, String emp_id) {

        for (Long id : ids) {
            String toString = String.valueOf(id);
            ProjectPhaseOutput projPhase = projectPhaseDao.getProjectPhaseById(toString);
            if (projPhase != null) {
                if (projPhase.getDel_flag() == 1) {
                    return "Project Phase with the ID " + id + " has already been deleted.";
                }
            } else {
                return "Project Phase with the ID " + id + " cannot be found.";
            }
        }
        projectPhaseDao.deleteMultipleProjectPhase(ids);
        
        return "Records are successfully deleted.";
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
                activityLogInput.setLog_desc("Restored a Project Phase.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Phase restored successfully.";
            }
        } else {
            return "Project Phase with the ID " + id + " cannot be found.";
        }
    }
}
