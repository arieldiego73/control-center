package com.controlcenter.controlcenter.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.ActivityLog;

@Mapper
public interface ActivityLogDao {
    List<ActivityLog> getAllActivityLog();
    void addActivityLog(ActivityLog activityLog);
}
