package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.PersonalInfoDao;
import com.controlcenter.controlcenter.model.PersonalInfo;
import com.controlcenter.controlcenter.service.PersonalInfoService;

@Service
public class PersonalInfoServiceImpl implements PersonalInfoService{
    
    @Autowired
    public PersonalInfoDao personalInfoDao;

    @Override 
    public List<PersonalInfo> getAllPersonalInfo() {
        return personalInfoDao.getAllPersonalInfo();
    }
}
