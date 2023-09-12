package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.StatusDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.StatusInput;
import com.controlcenter.controlcenter.model.StatusOutput;
import com.controlcenter.controlcenter.service.StatusService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class StatusServiceImpl implements StatusService{

    @Autowired 
    public StatusDao statusDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Override
    public List<StatusOutput> getAllStatus(){
        return statusDao.getAllStatus();
    }

    @Override
    public StatusOutput getStatusById(String id) {
        return statusDao.getStatusById(id);
    }

    @Override
    public String addStatus(StatusInput status){
        try{
            statusDao.addStatus(status);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Added a status.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Status added successfully.";
        } catch(Exception e){
            return e.getMessage();
        }
    }

    @Override
    public String editStatusInfo(String code, StatusOutput status){
        
        StatusOutput statusById = statusDao.getStatusById(code);

        if(statusById != null) {
            if(statusById.getDel_flag() == 1) {
                return "Status with the code " + code + " has already been deleted.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();
                statusById.setStatus_code(statusById.getStatus_code());
                status.setStatus_code(statusById.getStatus_code());
                System.out.println(status);
                paramMap.put("code", code);
                paramMap.put("status", status);

                statusDao.editStatusInfo(paramMap);

                //Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); //current logged user dapat
                activityLogInput.setLog_desc("Edited a status.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Status Edited Successfully.";
            }
        } else {
            return "Status with the code " + code + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteStatus(String code){
        StatusOutput statusById = statusDao.getStatusById(code);

        if(statusById != null) {
            if(statusById.getDel_flag() == 1 ) {
                return "Status with the code " + code + " has already been deleted.";
            } else {
                statusDao.logicalDeleteStatus(code);

                //Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); //current logged user dapat
                activityLogInput.setLog_desc("Deleted a status.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Status Deleted Successfully.";
            }
        } else {
            return "Status with the code " + code + " cannot be found.";
        }
    }

    @Override
    public String restoreStatus(String code){
        StatusOutput statusById = statusDao.getStatusById(code);

        if(statusById != null) {
            if(statusById.getDel_flag() == 0) {
                return "Status with the code " + code + " is not yet deleted.";
            } else {
                statusDao.restoreStatus(code);

                //Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); //current logged user dapat
                activityLogInput.setLog_desc("Restored a status.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Status Restored Successfully.";
            }
        } else {
            return "Status with the code " + code + " cannot be found.";
        }
    }
}
