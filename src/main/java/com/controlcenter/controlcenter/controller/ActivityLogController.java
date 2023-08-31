package com.controlcenter.controlcenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.ActivityLog;
import com.controlcenter.controlcenter.service.ActivityLogService;

@RestController
@RequestMapping("/history")
public class ActivityLogController {
    
    @Autowired
    public ActivityLogService activityLogService;

    @GetMapping("/all")
    public List<ActivityLog> getAllActivityLog() {
        return activityLogService.getAllActivityLog();
    } 
}
