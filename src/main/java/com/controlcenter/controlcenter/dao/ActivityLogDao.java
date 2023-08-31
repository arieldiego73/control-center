package com.controlcenter.controlcenter.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ActivityLogOutput;

@Mapper
public interface ActivityLogDao {
    List<ActivityLogOutput> getAllActivityLog();
    void addActivityLog(ActivityLogInput activityLog);
}
