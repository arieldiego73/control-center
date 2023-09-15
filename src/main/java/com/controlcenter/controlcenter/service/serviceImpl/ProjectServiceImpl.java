package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.ProjectDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ProjectInput;
import com.controlcenter.controlcenter.model.ProjectOutput;
import com.controlcenter.controlcenter.model.ProjectTable;
import com.controlcenter.controlcenter.service.ProjectService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    public ProjectDao projectDao;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Override
    public List<ProjectTable> projectTable() {
        return projectDao.projectTable();
    }

    @Override
    public List<ProjectOutput> getAllProject() {
        return projectDao.getAllProject();
    }

    @Override
    public ProjectOutput getProjectById(String id) {
        return projectDao.getProjectById(id);
    }

    @Override
    public String addProject(ProjectInput project) {
        try {
            projectDao.addProject(project);

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); // current logged user dapat
            activityLogInput.setLog_desc("Added a Project.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editProjectInfo(String id, ProjectInput project) {
        ProjectOutput data = projectDao.getProjectById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project with the ID " + id + " has already been deleted.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("project", project);

                projectDao.editProjectInfo(paramMap);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Edited a Project.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project edited successfully.";
            }
        } else {
            return "Project with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteProject(String id) {
        ProjectOutput data = projectDao.getProjectById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project with the ID " + id + " has already been deleted.";
            } else {
                projectDao.logicalDeleteProject(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Deleted a Project.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project deleted successfully.";
            }
        } else {
            return "Project with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String restoreProject(String id) {
        ProjectOutput data = projectDao.getProjectById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "Project with the ID " + id + " is not yet deleted.";
            } else {
                projectDao.restoreProject(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored a Project.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project restored successfully.";
            }
        } else {
            return "Project with the ID " + id + " cannot be found.";
        }
    }
}