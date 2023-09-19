package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.ProjMemberDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ProjMemberInput;
import com.controlcenter.controlcenter.model.ProjMemberOutput;
import com.controlcenter.controlcenter.service.ProjMemberService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class ProjMemberServiceImpl implements ProjMemberService {

    @Autowired
    public ProjMemberDao projMemberDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Override
    public ResponseEntity<List<ProjMemberOutput>> getAllProjMember() {
        return ResponseEntity.ok(projMemberDao.getAllProjMember());
    }

    @Override
    public ProjMemberOutput getProjMemberById(String id) {
        return projMemberDao.getProjMemberById(id);
    }

    @Override
    public String addProjMember(ProjMemberInput projMember, String emp_id) {
        try {
            projMemberDao.addProjMember(projMember);

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); // current logged user dapat
            activityLogInput.setLog_desc("Added a Project Member.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Member added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editProjMemberInfo(String id, ProjMemberInput projMember, String emp_id) {
        ProjMemberOutput data = projMemberDao.getProjMemberById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project Member with the ID " + id + " has already been deleted.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("projMember", projMember);

                projMemberDao.editProjMemberInfo(paramMap);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Edited a Project Member.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Member edited successfully.";
            }
        } else {
            return "Project Member with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteProjMember(String id, String emp_id) {
        ProjMemberOutput data = projMemberDao.getProjMemberById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project Member with the ID " + id + " has already been deleted.";
            } else {
                projMemberDao.logicalDeleteProjMember(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Deleted a Project Member.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Member deleted successfully.";
            }
        } else {
            return "Project Member with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String restoreProjMember(String id) {
        ProjMemberOutput data = projMemberDao.getProjMemberById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "Project Member with the ID " + id + " is not yet deleted.";
            } else {
                projMemberDao.restoreProjMember(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored a Project Member.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Member restored successfully.";
            }
        } else {
            return "Project Member with the ID " + id + " cannot be found.";
        }
    }
}
