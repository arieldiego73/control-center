package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.PersonalInfoInput;
import com.controlcenter.controlcenter.model.PersonalInfoOutput;

public interface PersonalInfoService {

    public List<PersonalInfoOutput> getAllPersonalInfo();

    public PersonalInfoOutput getPersonalInfoById(String id);

    public String addPersonalInfo(PersonalInfoInput personalInfo);

    public String editPersonalInfo(String id, PersonalInfoInput personalInfo);

    public String logicalDeletePersonalInfo(String id);

    public String restorePersonalInfo(String id);
}
