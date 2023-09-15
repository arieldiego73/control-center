package com.controlcenter.controlcenter.service.serviceImpl;

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
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class DevPhaseServiceImpl implements DevPhaseService {
    
    @Autowired
    public DevPhaseDao devPhaseDao;

    @Autowired 
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    List<DevPhaseOutput> devPhaseList = new ArrayList<>();
    List<DevPhaseOutput> nullDevPhase = new ArrayList<>();

    @Override
    public DevPhaseOutput getDevPhaseById(String id){
        return devPhaseDao.getDevPhaseById(id);
    }

    @Override
    public ResponseEntity<List<DevPhaseOutput>> getAllDevPhase(){
        try {
            return ResponseEntity.ok(devPhaseDao.getAllDevPhase());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(nullDevPhase);
        }
    }
    
    @Override
    public String addDevPhase(DevPhaseInput devPhase) {
        try {
            devPhaseDao.addDevPhase(devPhase);

            //Acivitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Added a Development Phase.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Development Phase added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editDevPhaseInfo(String id, DevPhaseInput devPhase) {
        DevPhaseOutput data = devPhaseDao.getDevPhaseById(id);

        if(data != null){
            if(data.getDel_flag() == 1){
                return "Development Phase with the ID " + id + " has already been deleted.";
            } else{
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("devPhase", devPhase);

                devPhaseDao.editDevPhaseInfo(paramMap);

                devPhaseList = devPhaseDao.getAllDevPhase();

                //Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); //current logged user dapat
                activityLogInput.setLog_desc("Edited a Development Phase.");

                Long currentTimeMillis = System.currentTimeMillis();
                //add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Development Phase edited successfully.";
            }
        } else{
            return "Development Phase with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteDevPhase(String id) {
        DevPhaseOutput data = devPhaseDao.getDevPhaseById(id);

        if(data != null){
            if(data.getDel_flag() == 1){
                return "Development Phase with the ID " + id + " has already been deleted.";
            } else{ 
                devPhaseDao.logicalDeleteDevPhase(id);
                devPhaseList = devPhaseDao.getAllDevPhase();

                //Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); //current logged user dapat
                activityLogInput.setLog_desc("Deleted a Development Phase.");

                Long currentTimeMillis = System.currentTimeMillis();
                //add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Development Phase deleted successfully.";
            }
        } else{
            return "Development Phase with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String deleteMultipleDevPhase(List<Long> ids) {
        devPhaseList = devPhaseDao.getAllDevPhase();

        for(Long id : ids) {
            String toString = String.valueOf(id);
            DevPhaseOutput devPhase = devPhaseDao.getDevPhaseById(toString);
            if(devPhase != null) {
                if(devPhase.getDel_flag() == 1) {
                    return "Development Phase with the ID " + id + " has already been deleted.";
                }
            } else {
                return "Development Phase with the ID " + id + " cannot be found.";
            }
        }
        devPhaseDao.deleteMultipleDevPhase(ids);

        //Acivitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id("101"); //current logged user dapat
        activityLogInput.setLog_desc("Deleted Multiple Development Phase.");

        Long currentTimeMillis = System.currentTimeMillis();
        //add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Records are successfully deleted.";
    }

        

    @Override
    public String restoreDevPhase(String id) {
        DevPhaseOutput data = devPhaseDao.getDevPhaseById(id);
        
        if(data != null){
            if(data.getDel_flag() == 0){
                return "Development Phase with the ID " + id + " is not yet deleted.";
            } else{
                devPhaseDao.restoreDevPhase(id);

                //Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); //current logged user dapat
                activityLogInput.setLog_desc("Restored a Development Phase.");

                Long currentTimeMillis = System.currentTimeMillis();
                //add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Development Phase restored successfully.";
            }
        } else{
            return "Development Phase with the ID " + id + " cannot be found.";
        }
    }
}