package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.ProjInfoDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ProjInfoInput;
import com.controlcenter.controlcenter.model.ProjInfoOutput;
import com.controlcenter.controlcenter.service.ProjInfoService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class ProjInfoServiceImpl implements ProjInfoService{
    
    @Autowired
    public ProjInfoDao projInfoDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Override
    public List<ProjInfoOutput> getAllProjInfo(){
        return projInfoDao.getAllProjInfo();
    }
    
    @Override
    public String addProjInfo(ProjInfoInput projInfo) {
        try {
            projInfoDao.addProjInfo(projInfo);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Added a Project Information.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Information added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editProjInfoInfo(String id, ProjInfoInput projInfo) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("projInfo", projInfo);

            projInfoDao.editProjInfoInfo(paramMap);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Edited a Project Information.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Information edited successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteProjInfo(String id) {
        try {
            projInfoDao.logicalDeleteProjInfo(id);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Deleted a Project Information.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Information deleted successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
    
    @Override
    public String restoreProjInfo(String id) {
        try {
            projInfoDao.restoreProjInfo(id);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Restored a Project Information.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Information restored successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
