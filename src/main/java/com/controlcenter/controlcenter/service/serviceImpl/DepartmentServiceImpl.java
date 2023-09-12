package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.DepartmentDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.DepartmentInput;
import com.controlcenter.controlcenter.model.DepartmentOutput;
import com.controlcenter.controlcenter.service.DepartmentService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class DepartmentServiceImpl implements DepartmentService{
    
    @Autowired
    public DepartmentDao departmentDao;

    @Autowired 
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Override
    public DepartmentOutput getDepartmentById(String id){
        return departmentDao.getDepartmentById(id);
    }

    @Override
    public ResponseEntity<List<DepartmentOutput>> getAllDepartment() {
        try {
            List<DepartmentOutput> departments = departmentDao.getAllDepartment();
            return ResponseEntity.ok(departments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override 
    public String addDepartment(DepartmentInput department) {
        
        try {
            departmentDao.addDepartment(department);

            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Added a department.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);
            
            return "Department Added Successfully.";
            
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editDepartmentInfo(String id, DepartmentInput department) {
        DepartmentOutput data = departmentDao.getDepartmentById(id);
        
        if(data != null){
            if(data.getDel_flag() == 1){
                return "Department with the ID " + id + " has already been deleted.";
            } else{
                Map<String, Object> paramMap = new HashMap<>();

                paramMap.put("id", id);
                paramMap.put("department", department);

                departmentDao.editDepartmentInfo(paramMap);

                //Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); //current logged user dapat
                activityLogInput.setLog_desc("Edited a Department.");

                Long currentTimeMillis = System.currentTimeMillis();
                //add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Department Edited Successfully.";
            }
        } else{
            return "Department with the ID " + id + " cannot be found.";
        }
            
    }

    @Override
    public String logicalDeleteDepartment(String id) {
        DepartmentOutput data = departmentDao.getDepartmentById(id);

        if(data != null){
            if(data.getDel_flag() == 1){
                return "Department with the ID " + id + " has already been deleted.";
            } else{
                departmentDao.logicalDeleteDepartment(id);

                //Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); //current logged user dapat
                activityLogInput.setLog_desc("Deleted a Department.");

                Long currentTimeMillis = System.currentTimeMillis();
                //add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Department Deleted Successfully.";
            }

        } else{
            return "Department with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String restoreDepartment(String id) {
        DepartmentOutput data = departmentDao.getDepartmentById(id);

        if(data != null){
            if(data.getDel_flag() == 1){
                return "Department with the ID " + id + " is not yet deleted.";
            } else{
                departmentDao.restoreDepartment(id);

                //Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); //current logged user dapat
                activityLogInput.setLog_desc("Restored a Department.");

                Long currentTimeMillis = System.currentTimeMillis();
                //add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Department Restored Successfully.";
            }

        } else{
            return "Department with the ID " + id + " cannot be found.";
        }
    }

}
