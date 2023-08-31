package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ActivityLogOutput;

public interface ActivityLogService {
    public List<ActivityLogOutput> getAllActivityLog();
    public String addActivityLog(ActivityLogInput activityLog);
}
