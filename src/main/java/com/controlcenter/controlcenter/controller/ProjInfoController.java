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

import com.controlcenter.controlcenter.model.ProjInfo;
import com.controlcenter.controlcenter.service.ProjInfoService;

@RestController
@RequestMapping("/proj-info")
public class ProjInfoController {

    @Autowired
    public ProjInfoService projInfoService;

    @GetMapping("/all")
    public List<ProjInfo> getAllProjInfo() {
        return projInfoService.getAllProjInfo();
    }

    @PostMapping("/add")
    public String addProjInfo(@RequestBody ProjInfo projInfo){
        return projInfoService.addProjInfo(projInfo);
    }

    @PutMapping("/edit/{id}")
    public String editProjInfoInfo(@PathVariable String id, @RequestBody ProjInfo projInfo) {
        return projInfoService.editProjInfoInfo(id, projInfo);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteProjInfo(@PathVariable String id) {
        return projInfoService.logicalDeleteProjInfo(id);
    }
}

