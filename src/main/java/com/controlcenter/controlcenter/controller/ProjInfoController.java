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
@RequestMapping("/projinfo")
public class ProjInfoController {

    @Autowired
    public ProjInfoService projinfoService;

    @GetMapping("/all")
    public List<ProjInfo> getAllProjInfo() {
        return projinfoService.getAllProjInfo();
    }

    @PostMapping("/add")
    public String addProjInfo(@RequestBody ProjInfo projinfo){
        return projinfoService.addProjInfo(projinfo);
    }

    @PutMapping("/edit/{id}")
    public String editProjInfoInfo(@PathVariable String id, @RequestBody ProjInfo projinfo) {
        return projinfoService.editProjInfoInfo(id, projinfo);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteProjInfo(@PathVariable String id) {
        return projinfoService.logicalDeleteProjInfo(id);
    }
}

