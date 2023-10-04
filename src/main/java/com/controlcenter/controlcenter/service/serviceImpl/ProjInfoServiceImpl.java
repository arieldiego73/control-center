package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.ProjInfoDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ProjInfoInput;
import com.controlcenter.controlcenter.model.ProjInfoOutput;
import com.controlcenter.controlcenter.service.ProjInfoService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class ProjInfoServiceImpl implements ProjInfoService {

    @Autowired
    public ProjInfoDao projInfoDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Override
    public ResponseEntity<List<ProjInfoOutput>> getAllProjInfo() {
        return ResponseEntity.ok(projInfoDao.getAllProjInfo());
    }

    @Override
    public ProjInfoOutput getProjInfoById(String id) {
        return projInfoDao.getProjInfoById(id);
    }

    @Override
    public String addProjInfo(ProjInfoInput projInfo, String emp_id) {
        try {
            projInfoDao.addProjInfo(projInfo);

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); // current logged user dapat
            activityLogInput.setLog_desc("Added a Project Information.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Project Information added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editProjInfo(String id, ProjInfoInput projInfo, String emp_id) {
        ProjInfoOutput data = projInfoDao.getProjInfoById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project Information with the ID " + id + " has already been deleted.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("projInfo", projInfo);

                projInfoDao.editProjInfo(paramMap);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Edited a Project Information.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Information edited successfully.";
            }
        } else {
            return "Project Information with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteProjInfo(String id, String emp_id) {
        ProjInfoOutput data = projInfoDao.getProjInfoById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project Information with the ID " + id + " has already been deleted.";
            } else {
                projInfoDao.logicalDeleteProjInfo(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Deleted a Project Information.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Information deleted successfully.";
            }
        } else {
            return "Project Information with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String deleteMultipleProjInfo(List<Long> ids, String emp_id) {

        for (Long id : ids) {
            String toString = String.valueOf(id);
            ProjInfoOutput projInfo = projInfoDao.getProjInfoById(toString);
            if (projInfo != null) {
                if (projInfo.getDel_flag() == 1) {
                    return "Project Information with the ID " + id + " has already been deleted.";
                }
            } else {
                return "Project Information with the ID " + id + " cannot be found.";
            }
        }
        projInfoDao.deleteMultipleProjInfo(ids);
        
        return "Records are successfully deleted.";
    }

    @Override
    public String restoreProjInfo(String id, String emp_id) {
        ProjInfoOutput data = projInfoDao.getProjInfoById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "Project Information with the ID " + id + " is not yet deleted.";
            } else {
                projInfoDao.restoreProjInfo(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Restored a Project Information.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project Information restored successfully.";
            }
        } else {
            return "Project Information with the ID " + id + " cannot be found.";
        }
    }
}
