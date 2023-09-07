package com.controlcenter.controlcenter.service.serviceImpl;

import java.sql.Date;
import java.text.SimpleDateFormat;
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
            // Convert milliseconds to a human-readable date and time format
            // SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            // String formattedDate = sdf.format(new Date(currentTimeMillis));
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);
            
            return "Department Added Successfully.";
            
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editDepartmentInfo(String id, DepartmentInput department) {
        
        try {
            if(department.getDept_name() != null) {
                if(department.getDept_name().length() > 150 || department.getDept_name().length() < 1) {
                    return "The length of the data entered does not reach the specified length.";
                } else {
                    Map<String, Object> paramMap = new HashMap<>();

                    paramMap.put("id", id);
                    paramMap.put("department", department);

                    departmentDao.editDepartmentInfo(paramMap);

                    return "Department Edited Successfully.";
                }
            } else {
                return "The Department Name is empty.";
            }
            
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteDepartment(String id) {
        try {
            departmentDao.logicalDeleteDepartment(id);
            return "Department Deleted Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreDepartment(String id) {
        try {
            departmentDao.restoreDepartment(id);
            return "Department Restored Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

}
