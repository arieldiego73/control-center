package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.ProjectStatusDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ProjectStatusInput;
import com.controlcenter.controlcenter.model.ProjectStatusOutput;
import com.controlcenter.controlcenter.service.ProjectStatusService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class ProjectStatusServiceImpl implements ProjectStatusService {
    @Autowired
    public ProjectStatusDao projectStatusDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    List<ProjectStatusOutput> projectStatusList = new ArrayList<>();

    @Override
    public List<ProjectStatusOutput> getAllProjectStatus() {
        return projectStatusDao.getAllProjectStatus();
    }

    @Override
    public ProjectStatusOutput getProjectStatusById(String id) {
        return projectStatusDao.getProjectStatusById(id);
    }

    @Override
    public String addProjectStatus(ProjectStatusInput projectStatus) {
        try {
            projectStatusDao.addProjectStatus(projectStatus);

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); // current logged user dapat
            activityLogInput.setLog_desc("Added a project status.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Status Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editProjectStatus(String id, ProjectStatusInput projectStatus) {
        ProjectStatusOutput data = projectStatusDao.getProjectStatusById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project Status with the ID " + id + " has already been deleted.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("projectStatus", projectStatus);

                projectStatusDao.editProjectStatus(paramMap);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Edited a project status.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Status Edited Successfully.";
            }
        } else {
            return "Project Status with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteProjectStatus(String id) {
        ProjectStatusOutput data = projectStatusDao.getProjectStatusById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project Status with the ID " + id + " has already been deleted.";
            } else {
                projectStatusDao.logicalDeleteProjectStatus(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Delete a project status.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Status Deleted Successfully.";
            }
        } else {
            return "Project Status with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String deleteMultipleProjectStatus(@RequestParam List<Long> ids) {
        projectStatusList = projectStatusDao.getAllProjectStatus();

        for (Long id : ids) {
            String toString = String.valueOf(id);
            ProjectStatusOutput projectStatus = projectStatusDao.getProjectStatusById(toString);

            if (projectStatusDao != null) {
                if (projectStatus.getDel_flag() == 1) {
                    return "Project Status with the ID " + id + " has already been deleted.";
                }
            } else {
                return "Project Status with the ID " + id + " cannot be found.";
            }
        }
        projectStatusDao.deleteMultipleProjectStatus(ids);

        // Activitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id("101"); // current logged user dapat
        activityLogInput.setLog_desc("Deleted a multiple postion.");

        Long currentTimeMillis = System.currentTimeMillis();
        // add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Records are successfully deleted.";
    }

    @Override
    public String restoreProjectStatus(String id) {
        ProjectStatusOutput data = projectStatusDao.getProjectStatusById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "Project Status with the ID " + id + " is not yet deleted.";
            } else {
                projectStatusDao.restoreProjectStatus(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored a project status.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Status Restored Successfully.";
            }
        } else {
            return "Project Status with the ID " + id + " cannot be found.";
        }
    }
}
