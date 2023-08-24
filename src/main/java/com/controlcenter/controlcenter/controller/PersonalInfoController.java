package com.controlcenter.controlcenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.PersonalInfo;
import com.controlcenter.controlcenter.service.PersonalInfoService;

@RestController
@RequestMapping("/personal-info")
public class PersonalInfoController {
    
    @Autowired  
    public PersonalInfoService personalInfoService;

    @GetMapping("/all")
    public List<PersonalInfo> getAllPerosnalInfo() {
        return personalInfoService.getAllPersonalInfo();
    }
}
