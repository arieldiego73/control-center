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
    public ResponseEntity<List<UserProjectOutput>> getAllUserProject(){
        try {
            List<UserProjectOutput> userProjects = userProjectDao.getAllUserProject();
            return ResponseEntity.ok(userProjects);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @Override
    public String addUserProject(UserProjectInput userProject) {
        try {
            userProjectDao.addUserProject(userProject);

            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Added a user project.");

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
        try {
            //List<UserProjectOutput> userProjects = userProjectDao.getAllUserProject(); 
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("userProject", userProject);

            userProjectDao.editUserProjectInfo(paramMap);

            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Edit a user project.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "User Project Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteUserProject(String id) {
        try {
        
            userProjectDao.logicalDeleteUserProject(id);

            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Delete a user project.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);
            

            return "UserProject deleted successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreUserProject(String id) {
        try {
        
            userProjectDao.restoreUserProject(id);

            ActivityLogInput activityLogInput = new ActivityLogInput();

            
            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Restore User Project.");
            
            Long currentTimeMillis = System.currentTimeMillis();
            //Restore the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);


            return "UserProject restored successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}