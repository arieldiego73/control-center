package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<ProjectTechnologyOutput>> getAllProjectTechnology() {
        return ResponseEntity.ok(projectTechnologyDao.getAllProjectTechnology());
    }

    @Override
    public ProjectTechnologyOutput getProjectTechnologyById(String id) {
        return projectTechnologyDao.getProjectTechnologyById(id);
    }

    @Override
    public String addProjectTechnology(ProjectTechnologyInput projectTechnology, String emp_id) {
        try {
            projectTechnologyDao.addProjectTechnology(projectTechnology);

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); // current logged user dapat
            activityLogInput.setLog_desc("Added a Project Technology.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Technology added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editProjectTechnology(String id, ProjectTechnologyInput projectTechnology, String emp_id) {
        ProjectTechnologyOutput data = projectTechnologyDao.getProjectTechnologyById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project Technology with the ID " + id + " has already been deleted.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("projectTechnology", projectTechnology);

                projectTechnologyDao.editProjectTechnology(paramMap);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Edited a Project Technology.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Technology edited successfully.";
            }
        } else {
            return "Project Technology with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteProjectTechnology(String id, String emp_id) {
        ProjectTechnologyOutput data = projectTechnologyDao.getProjectTechnologyById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project Technology with the ID " + id + " has already been deleted.";
            } else {
                projectTechnologyDao.logicalDeleteProjectTechnology(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Deleted a Project Technology.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Technology deleted successfully.";
            }
        } else {
            return "Project Technology with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String deleteMultipleProjectTechnology(List<Long> ids, String emp_id) {

        for (Long id : ids) {
            String toString = String.valueOf(id);
            ProjectTechnologyOutput projectTechnology = projectTechnologyDao.getProjectTechnologyById(toString);
            if (projectTechnology != null) {
                if (projectTechnology.getDel_flag() == 1) {
                    return "Project Technology with the ID " + id + " has already been deleted.";
                }
            } else {
                return "Project Technology with the ID " + id + " cannot be found.";
            }
        }
        projectTechnologyDao.deleteMultipleProjectTechnology(ids);
        
        return "Records are successfully deleted.";
    }

    @Override
    public String restoreProjectTechnology(String id, String emp_id) {
        ProjectTechnologyOutput data = projectTechnologyDao.getProjectTechnologyById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "Project Technology with the ID " + id + " is not yet deleted.";
            } else {
                projectTechnologyDao.restoreProjectTechnology(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Restored a Project Technology.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Technology restored successfully.";
            }
        } else {
            return "Project Technology with the ID " + id + " cannot be found.";
        }
    }

}
