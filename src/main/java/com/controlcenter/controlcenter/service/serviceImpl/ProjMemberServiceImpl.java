package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.ProjMemberDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ProjMemberInput;
import com.controlcenter.controlcenter.model.ProjMemberOutput;
import com.controlcenter.controlcenter.service.ProjMemberService;
import com.controlcenter.controlcenter.shared.TimeFormatter;


@Service
public class ProjMemberServiceImpl implements ProjMemberService{
    
    @Autowired
    public ProjMemberDao projMemberDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;
    
    @Override
    public List<ProjMemberOutput> getAllProjMember(){
        return projMemberDao.getAllProjMember();
    }
    
    @Override
    public String addProjMember(ProjMemberInput projMember) {
        try {
            projMemberDao.addProjMember(projMember);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Added a Project Member.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);
            
            return "Project Member added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editProjMemberInfo(String id, ProjMemberInput projMember) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("projMember", projMember);

            projMemberDao.editProjMemberInfo(paramMap);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Edited a Project Member.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Member edited successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteProjMember(String id) {
        try {
            projMemberDao.logicalDeleteProjMember(id);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Deleted a Project Member.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Member deleted successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreProjMember(String id) {
        try {
            projMemberDao.restoreProjMember(id);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Restored a Project Member.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Member restored successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
