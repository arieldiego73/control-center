package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.controlcenter.controlcenter.model.PersonalInfoInput;
import com.controlcenter.controlcenter.model.PersonalInfoOutput;

public interface PersonalInfoService {

    public ResponseEntity<List<PersonalInfoOutput>> getAllPersonalInfo();

    public PersonalInfoOutput getPersonalInfoById(String id);

    public String addPersonalInfo(PersonalInfoInput personalInfo, String emp_id);

    public String editPersonalInfo(String id, PersonalInfoInput personalInfo, String emp_id);

    public String logicalDeletePersonalInfo(String id, String emp_id);

    public String restorePersonalInfo(String id);

    public String deleteMultiplePersonalInfo(List<String> ids, String emp_id);
}
