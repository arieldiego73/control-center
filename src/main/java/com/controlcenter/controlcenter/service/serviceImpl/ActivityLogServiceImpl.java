package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.model.ActivityLog;
import com.controlcenter.controlcenter.service.ActivityLogService;

@Service
public class ActivityLogServiceImpl implements ActivityLogService{
    
    @Autowired
    ActivityLogDao activityLogDao;

    @Override
    public List<ActivityLog> getAllActivityLog() {
        return activityLogDao.getAllActivityLog();
    }
}
