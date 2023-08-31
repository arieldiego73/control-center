package com.controlcenter.controlcenter.service.serviceImpl;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.DevPhaseDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.DevPhaseInput;
import com.controlcenter.controlcenter.model.DevPhaseOutput;
import com.controlcenter.controlcenter.service.DevPhaseService;

@Service
public class DevPhaseServiceImpl implements DevPhaseService {
    
    @Autowired
    public DevPhaseDao devPhaseDao;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Override
    public List<DevPhaseOutput> getAllDevPhase(){
        return devPhaseDao.getAllDevPhase();
    }
    
    @Override
    public String addDevPhase(DevPhaseInput devPhase) {
        try {
            devPhaseDao.addDevPhase(devPhase);

            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Added a dev phase.");

            long currentTimeMillis = System.currentTimeMillis();
            // Convert milliseconds to a human-readable date and time format
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String formattedDate = sdf.format(new Date(currentTimeMillis));
            activityLogInput.setLog_date(formattedDate);
            // add the activity log
            activityLogDao.addActivityLog(activityLogInput);
            
            return "Development Phase Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editDevPhaseInfo(String id, DevPhaseInput devPhase) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("devPhase", devPhase);

            devPhaseDao.editDevPhaseInfo(paramMap);

            return "Development Phase Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteDevPhase(String id) {
        try {
            devPhaseDao.logicalDeleteDevPhase(id);
            return "Development Phase Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreDevPhase(String id) {
        try {
            devPhaseDao.restoreDevPhase(id);
            return "Development Phase Restored Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
