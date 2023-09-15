package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.UserProjectDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.UserProjectInput;
import com.controlcenter.controlcenter.model.UserProjectOutput;
import com.controlcenter.controlcenter.service.UserProjectService;
import com.controlcenter.controlcenter.shared.ErrorHandler;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class UserProjectServiceImpl implements UserProjectService {

    @Autowired
    public UserProjectDao userProjectDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Autowired
    public ErrorHandler errorHandler;

    @Override
    public List<UserProjectOutput> getAllUserProject() {
        return userProjectDao.getAllUserProject();
    }

    @Override
    public UserProjectOutput getUserProjectById(String id) {
        return userProjectDao.getUserProjectById(id);
    }

    @Override
    public String addUserProject(UserProjectInput userProject) {
        try {
            userProjectDao.addUserProject(userProject);

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); // current logged user dapat
            activityLogInput.setLog_desc("Added a User Project.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "User Project added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editUserProjectInfo(String id, UserProjectInput userProject) {
        UserProjectOutput data = userProjectDao.getUserProjectById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "User Project with the ID " + id + " has already been deleted.";
            } else {
                // List<UserProjectOutput> userProjects = userProjectDao.getAllUserProject();
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("userProject", userProject);

                userProjectDao.editUserProjectInfo(paramMap);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Edited a User Project.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "User Project edited successfully.";
            }
        } else {
            return "User Project with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteUserProject(String id) {
        UserProjectOutput data = userProjectDao.getUserProjectById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "User Project with the ID " + id + " has already been deleted.";
            } else {
                userProjectDao.logicalDeleteUserProject(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Deleted a User Project.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "User Project deleted successfully.";
            }
        } else {
            return "User Project with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String restoreUserProject(String id) {
        UserProjectOutput data = userProjectDao.getUserProjectById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "User Project with the ID " + id + " is not yet deleted.";
            } else {
                userProjectDao.restoreUserProject(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored User Project.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "User Project restored successfully.";
            }
        } else {
            return "User Project with the ID " + id + " cannot be found.";
        }
    }
}