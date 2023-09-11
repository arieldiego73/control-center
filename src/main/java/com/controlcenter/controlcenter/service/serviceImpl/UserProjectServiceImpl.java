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
    public UserProjectOutput getUserProjectById(String id) {
        return userProjectDao.getUserProjectById(id);
    }
    
    @Override
    public String addUserProject(UserProjectInput userProject) {
        try {
            userProjectDao.addUserProject(userProject);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Added a user project.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "User Project added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editUserProjectInfo(String id, UserProjectInput userProject) {
        UserProjectOutput userProjectById = userProjectDao.getUserProjectById(id);

        if(userProjectById != null) {
            if(userProjectById.getDel_flag() == 1 ) {
                return "User Project with id of " + id + " has already been deleted";
            } else {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("userProject", userProject);

                userProjectDao.editUserProjectInfo(paramMap);

                //Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); //current logged user dapat
                activityLogInput.setLog_desc("Edited a user project.");

                Long currentTimeMillis = System.currentTimeMillis();
                //add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "User Project Edited Successfully";
            }
        } else {
            return "User Project with id of " + id + " cannot be found";
        }
    }

    @Override
    public String logicalDeleteUserProject(String id) {
        UserProjectOutput userProjectById = userProjectDao.getUserProjectById(id);

        if(userProjectById != null) {
            if(userProjectById.getDel_flag() == 1 ) {
                return "User Project with id of " + id + " has already been deleted";
            } else {
                userProjectDao.logicalDeleteUserProject(id);

                //Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); //current logged user dapat
                activityLogInput.setLog_desc("Deleted a user project.");

                Long currentTimeMillis = System.currentTimeMillis();
                //add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);
                
                return "User Project Deleted Successfully.";
            }
        } else {
            return "User Project with id of " + id + " cannot be found";
        }
    }

    @Override
    public String restoreUserProject(String id) {
        UserProjectOutput userProjectById = userProjectDao.getUserProjectById(id);

        if(userProjectById != null) {
            if(userProjectById.getDel_flag() == 0 ) {
                return "User Project with id of " + id + " is not yet deleted";
            } else {
                userProjectDao.restoreUserProject(id);

                //Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); //current logged user dapat
                activityLogInput.setLog_desc("Restored User Project.");
                
                Long currentTimeMillis = System.currentTimeMillis();
                //add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);


                return "User Project Restored Successfully.";
            }
        } else {
            return "User Project with id of " + id + " cannot be found";
        }
        // try {
        
        //     userProjectDao.restoreUserProject(id);

        //     //Activitylog
        //     ActivityLogInput activityLogInput = new ActivityLogInput();

        //     activityLogInput.setEmp_id("101"); //current logged user dapat
        //     activityLogInput.setLog_desc("Restored User Project.");
            
        //     Long currentTimeMillis = System.currentTimeMillis();
        //     //add the activity log
        //     activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        //     activityLogDao.addActivityLog(activityLogInput);


        //     return "UserProject restored successfully.";
        // } catch (Exception e) {
        //     return e.getMessage();
        // }
    }
}