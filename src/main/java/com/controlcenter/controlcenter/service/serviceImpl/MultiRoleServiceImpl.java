package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.MultiRoleDao;
import com.controlcenter.controlcenter.dao.UserDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.MultiRoleInput;
import com.controlcenter.controlcenter.model.MultiRoleOutput;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.service.MultiRoleService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class MultiRoleServiceImpl implements MultiRoleService{

    @Autowired
    public MultiRoleDao multiRoleDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Autowired
    public UserDao userDao;

    List<MultiRoleOutput> multiRoleList = new ArrayList<>();

    @Override
    public ResponseEntity<List<MultiRoleOutput>> getAllMultiRole(){
        return ResponseEntity.ok().body(multiRoleDao.getAllMultiRole());
    }

    @Override
    public MultiRoleOutput getMultiRoleById(String id) {
        return multiRoleDao.getMultiRoleById(id);
    }

    @Override
    public String addMultiRole(String emp_id, Long role_id, String emp_ID){
        UserInfoOutput user = userDao.getUserById(emp_id);
        if(user != null){
            multiRoleDao.addMultiRole(emp_id, role_id);

            //Acivitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_ID); //current logged user dapat
            activityLogInput.setLog_desc("Added a Multiple Role.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Multi Role Added Successfully";
        } else {
            return "User with Employee ID of " + emp_id + " cannot be found";
        }
    }

    @Override
    public String editMultiRoleInfo(String id, MultiRoleInput multiRole, String emp_id){
        try{

            MultiRoleOutput data = multiRoleDao.getMultiRoleById(id);
            data.setDel_flag(data.getDel_flag());
            if(data.getDel_flag() > 0) {
                return "Multiple Role does not exist.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("multiRole", multiRole);

                multiRoleDao.editMultiRoleInfo(paramMap);

                //Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); //current logged user dapat
                activityLogInput.setLog_desc("Edited a Multiple Role.");

                Long currentTimeMillis = System.currentTimeMillis();
                //add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Multi Role Edited Successfully";
            }
        } catch (Exception e){
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteMultiRole(String id, String emp_id){
        try{
            multiRoleDao.logicalDeleteMultiRole(id);

            //Acivitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); //current logged user dapat
            activityLogInput.setLog_desc("Deleted a Multiple Role.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Multi Role Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String deleteMultipleMultiRole(List<String> ids, String emp_id) {
        multiRoleList = multiRoleDao.getAllMultiRole();

        for(String id : ids) {
            MultiRoleOutput multiRole = multiRoleDao.getMultiRoleById(id);
            if(multiRole != null) {
                if(multiRole.getDel_flag() == 1) {
                    return "Personal Information with the ID " + id + " has already been deleted.";
                }
            } else {
                return "Personal Information with the ID " + id + " cannot be found.";
            }
        }
        multiRoleDao.deleteMultipleMultiRole(ids);

        return "Records are successfully deleted.";
    }

    @Override
    public String restoreMultiRole(String id){
        try{
            multiRoleDao.restoreMultiRole(id);

            //Acivitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Restored a Multiple Role.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Multi Role Restored Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String permaDeleteRole(String emp_id, Long role_id) {
        try {
            // List<UserRoles> allRoles = userDao.getAllRolesOfUser(emp_id);

            // for(UserRoles role : allRoles) {
            //     if(role != null) {
            //         multiRoleDao.permaDeleteRoleOfUser(emp_id, role_id);
            //     } else {
            //         return "Hello Madlang People Mabuhay";
            //     }
            // }
            multiRoleDao.permaDeleteRoleOfUser(emp_id, role_id);
            return "Role Removed Successfully";

        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
