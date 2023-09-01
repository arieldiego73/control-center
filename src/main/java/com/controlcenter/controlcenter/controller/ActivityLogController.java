package com.controlcenter.controlcenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ActivityLogOutput;
import com.controlcenter.controlcenter.service.ActivityLogService;

@RestController
@RequestMapping("/history")
public class ActivityLogController {
    
    @Autowired
    public ActivityLogService activityLogService;

    @GetMapping("/all")
    public List<ActivityLogOutput> getAllActivityLog() {
        return activityLogService.getAllActivityLog();
    } 

    @PostMapping("/add")
    public String addActivityLog(@RequestBody ActivityLogInput activityLog) {
        return activityLogService.addActivityLog(activityLog);
    }
}
