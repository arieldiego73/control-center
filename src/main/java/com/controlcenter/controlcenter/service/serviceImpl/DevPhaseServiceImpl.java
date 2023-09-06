package com.controlcenter.controlcenter.service.serviceImpl;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    List<DevPhaseOutput> nullDevPhase = new ArrayList<DevPhaseOutput>();

    @Override
    public ResponseEntity<List<DevPhaseOutput>> getAllDevPhase(){
        try {
            return ResponseEntity.ok(devPhaseDao.getAllDevPhase());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(nullDevPhase);
        }
    }
    
    @Override
    public ResponseEntity<List<DevPhaseOutput>> addDevPhase(DevPhaseInput devPhase) {
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

            List<DevPhaseOutput> devPhaseList = devPhaseDao.getAllDevPhase();
            return ResponseEntity.ok(devPhaseList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(nullDevPhase);
        }
    }

    @Override 
    public ResponseEntity<List<DevPhaseOutput>> editDevPhaseInfo(String id, DevPhaseInput devPhase) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("devPhase", devPhase);

            devPhaseDao.editDevPhaseInfo(paramMap);

            List<DevPhaseOutput> devPhaseList = devPhaseDao.getAllDevPhase();
            return ResponseEntity.ok(devPhaseList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(nullDevPhase);
        }
    }

    @Override
    public ResponseEntity<List<DevPhaseOutput>> logicalDeleteDevPhase(String id) {
        try {
            devPhaseDao.logicalDeleteDevPhase(id);
            List<DevPhaseOutput> devPhaseList = devPhaseDao.getAllDevPhase();
            return ResponseEntity.ok(devPhaseList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(nullDevPhase);
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
