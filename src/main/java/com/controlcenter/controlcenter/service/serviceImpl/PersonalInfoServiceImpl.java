package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.PersonalInfoDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.PersonalInfoInput;
import com.controlcenter.controlcenter.model.PersonalInfoOutput;
import com.controlcenter.controlcenter.service.PersonalInfoService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class PersonalInfoServiceImpl implements PersonalInfoService {

    @Autowired
    public PersonalInfoDao personalInfoDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Override
    public List<PersonalInfoOutput> getAllPersonalInfo() {
        return personalInfoDao.getAllPersonalInfo();
    }

    @Override
    public PersonalInfoOutput getPersonalInfoById(String id) {
        return personalInfoDao.getPersonalInfoById(id);
    }

    @Override
    public String addPersonalInfo(PersonalInfoInput personalInfo) {
        try {
            personalInfoDao.addPersonalInfo(personalInfo);

            // Acivitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); // current logged user dapat
            activityLogInput.setLog_desc("Added a personal Information.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Personal Info Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editPersonalInfo(String id, PersonalInfoInput personalInfo) {
        PersonalInfoOutput data = personalInfoDao.getPersonalInfoById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Personal Information with the ID " + id + " has already been deleted.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();

                paramMap.put("id", id);
                paramMap.put("personalInfo", personalInfo);

                personalInfoDao.editPersonalInfo(paramMap);

                // Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Edited a personal Information.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Personal Information Edited Successfully.";
            }
        } else {
            return "Personal Information with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeletePersonalInfo(String id) {
        PersonalInfoOutput data = personalInfoDao.getPersonalInfoById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Personal Information with the ID " + id + " has already been deleted.";
            } else {
                personalInfoDao.logicalDeletePersonalInfo(id);

                // Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Deleted a personal Information.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Personal Information Deleted Successfully.";
            }
        } else {
            return "Personal Information with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String restorePersonalInfo(String id) {
        PersonalInfoOutput data = personalInfoDao.getPersonalInfoById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "Personal Information with the ID " + id + " is not yet deleted.";
            } else {
                personalInfoDao.restorePersonalInfo(id);

                // Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored a personal Information.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Personal Information Restored Successfully.";
            }
        } else {
            return "Personal Information with the ID " + id + " cannot be found.";
        }
    }
}
