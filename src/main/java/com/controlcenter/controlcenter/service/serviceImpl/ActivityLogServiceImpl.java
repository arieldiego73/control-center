package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ActivityLogOutput;
import com.controlcenter.controlcenter.service.ActivityLogService;

@Service
public class ActivityLogServiceImpl implements ActivityLogService{
    
    @Autowired
    ActivityLogDao activityLogDao;

    @Override
    public List<ActivityLogOutput> getAllActivityLog() {
        return activityLogDao.getAllActivityLog();
    }

    @Override
    public String addActivityLog(ActivityLogInput activityLog) {
        try {
            activityLogDao.addActivityLog(activityLog);
            return "Activity Log added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
