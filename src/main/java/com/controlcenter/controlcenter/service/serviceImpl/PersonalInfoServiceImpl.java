package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    List<PersonalInfoOutput> personalInfoList = new ArrayList<>();

    @Override
    public ResponseEntity<List<PersonalInfoOutput>> getAllPersonalInfo() {
        return ResponseEntity.ok().body(personalInfoDao.getAllPersonalInfo());
    }

    @Override
    public PersonalInfoOutput getPersonalInfoById(String id) {
        return personalInfoDao.getPersonalInfoById(id);
    }

    @Override
    public String addPersonalInfo(PersonalInfoInput personalInfo, String emp_id) {
        try {
            personalInfoDao.addPersonalInfo(personalInfo);

            // Acivitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); // current logged user dapat
            activityLogInput.setLog_desc("Added a Personal Information.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Personal Information added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editPersonalInfo(String id, PersonalInfoInput personalInfo, String emp_id) {
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

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Edited a Personal Information.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Personal Information edited successfully.";
            }
        } else {
            return "Personal Information with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeletePersonalInfo(String id, String emp_id) {
        PersonalInfoOutput data = personalInfoDao.getPersonalInfoById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Personal Information with the ID " + id + " has already been deleted.";
            } else {
                personalInfoDao.logicalDeletePersonalInfo(id);

                // Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Deleted a Personal Information.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Personal Information deleted successfully.";
            }
        } else {
            return "Personal Information with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String deleteMultiplePersonalInfo(List<String> ids, String emp_id) {
        personalInfoList = personalInfoDao.getAllPersonalInfo();

        for(String id : ids) {
            PersonalInfoOutput personalInfo = personalInfoDao.getPersonalInfoById(id);
            if(personalInfo != null) {
                if(personalInfo.getDel_flag() == 1) {
                    return "Personal Information with the ID " + id + " has already been deleted.";
                }
            } else {
                return "Personal Information with the ID " + id + " cannot be found.";
            }
        }
        personalInfoDao.deleteMultiplePersonalInfo(ids);

        return "Records are successfully deleted.";
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
                activityLogInput.setLog_desc("Restored a Personal Information.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Personal Information restored successfully.";
            }
        } else {
            return "Personal Information with the ID " + id + " cannot be found.";
        }
    }
}
