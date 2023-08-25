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

import com.controlcenter.controlcenter.model.DevPhase;
import com.controlcenter.controlcenter.service.DevPhaseService;


@RestController
@RequestMapping("/devphase")

public class DevPhaseController {

    @Autowired
    public DevPhaseService devphaseService;

    @GetMapping("/all")
    public List<DevPhase> getAllDevPhase() {
        return devphaseService.getAllDevPhase();
    }

    @PostMapping("/add")
    public String addDevPhase(@RequestBody DevPhase devphase){
        return devphaseService.addDevPhase(devphase);
    }

    @PutMapping("/edit/{id}")
    public String editDevPhaseInfo(@PathVariable String id, @RequestBody DevPhase devphase) {
        return devphaseService.editDevPhaseInfo(id, devphase);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteDevPhase(@PathVariable String id) {
        return devphaseService.logicalDeleteDevPhase(id);
    }
}