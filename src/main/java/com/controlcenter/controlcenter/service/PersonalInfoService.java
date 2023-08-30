package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.PersonalInfo;

public interface PersonalInfoService {
    
    public List<PersonalInfo> getAllPersonalInfo();
    public String addPersonalInfo(PersonalInfo personalInfo);
    public String editPersonalInfo(String id, PersonalInfo personalInfo);
    public String logicalDeletePersonalInfo(String id);
    public String restorePersonalInfo(String id);
}
