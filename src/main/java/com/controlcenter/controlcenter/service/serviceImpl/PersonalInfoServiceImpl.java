package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.PersonalInfoDao;
import com.controlcenter.controlcenter.model.PersonalInfoInput;
import com.controlcenter.controlcenter.model.PersonalInfoOutput;
import com.controlcenter.controlcenter.service.PersonalInfoService;

@Service
public class PersonalInfoServiceImpl implements PersonalInfoService{
    
    @Autowired
    public PersonalInfoDao personalInfoDao;

    @Override 
    public List<PersonalInfoOutput> getAllPersonalInfo() {
        return personalInfoDao.getAllPersonalInfo();
    }

    @Override
    public String addPersonalInfo(PersonalInfoInput personalInfo) {
        try {
            personalInfoDao.addPersonalInfo(personalInfo);

            return "Personal Info Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editPersonalInfo(String id, PersonalInfoInput personalInfo) {
        try {
            Map<String, Object> paramMap = new HashMap<>();

            paramMap.put("id", id);
            paramMap.put("personalInfo", personalInfo);

            personalInfoDao.editPersonalInfo(paramMap);

            return "Personal Info Edited Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeletePersonalInfo(String id) {
        try {
            personalInfoDao.logicalDeletePersonalInfo(id);
            
            return "Personal Info Deleted Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restorePersonalInfo(String id) {
        try {
            personalInfoDao.restorePersonalInfo(id);
            
            return "Personal Info Deleted Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
