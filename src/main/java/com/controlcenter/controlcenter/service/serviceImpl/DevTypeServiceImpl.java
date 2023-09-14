package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.DevTypeDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.DevTypeInput;
import com.controlcenter.controlcenter.model.DevTypeOutput;
import com.controlcenter.controlcenter.service.DevTypeService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class DevTypeServiceImpl implements DevTypeService {
    @Autowired
    public DevTypeDao devTypeDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Override
    public List<DevTypeOutput> getAllDevType() {
        return devTypeDao.getAllDevType();
    }

    @Override
    public DevTypeOutput getDevTypeById(String id) {
        return devTypeDao.getDevTypeById(id);
    }

    @Override
    public String addDevType(DevTypeInput devType) {
        try {
            devTypeDao.addDevType(devType);

            // Acivitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); // current logged user dapat
            activityLogInput.setLog_desc("Added a development type.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Development Type Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editDevTypeInfo(String id, DevTypeInput devType) {
        DevTypeOutput data = devTypeDao.getDevTypeById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Development Type with the ID " + id + " has already been deleted.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("devType", devType);

                devTypeDao.editDevTypeInfo(paramMap);

                // Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Edited a development type.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Development Type Edited Successfully";
            }
        } else {
            return "Development Type with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteDevType(String id) {
        DevTypeOutput data = devTypeDao.getDevTypeById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Development Type with the ID " + id + " has already been deleted.";
            } else {
                devTypeDao.logicalDeleteDevType(id);

                // Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Deleted a development type.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Development Type Deleted Successfully";
            }
        } else {
            return "Development Type with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String restoreDevType(String id) {
        DevTypeOutput data = devTypeDao.getDevTypeById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "Development Type with the ID " + id + " is not yet deleted.";
            } else {
                devTypeDao.restoreDevType(id);

                // Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored a development type.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Development Type Restored Successfully";
            }
        } else {
            return "Development Type with the ID " + id + " cannot be found.";
        }
    }
}
