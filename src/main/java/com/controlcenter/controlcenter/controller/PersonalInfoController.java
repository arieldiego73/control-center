package com.controlcenter.controlcenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public List<PersonalInfo> getAllPersonalInfo() {
        return personalInfoService.getAllPersonalInfo();
    }

    @PostMapping("/add")
    public String addPersonalInfo(@RequestBody PersonalInfo personalInfo) {
        return personalInfoService.addPersonalInfo(personalInfo);
    }

    @PutMapping("/edit/{id}")
    public String editPersonalInfo(@PathVariable String id, @RequestBody PersonalInfo personalInfo) {
        return personalInfoService.editPersonalInfo(id, personalInfo);
    }

    @PutMapping("delete/{id}")
    public String logicalDeletePersonalInfo(@PathVariable String id) {
        return personalInfoService.logicalDeletePersonalInfo(id);
    }
}
