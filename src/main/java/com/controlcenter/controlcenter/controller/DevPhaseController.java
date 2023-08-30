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
@RequestMapping("/dev-phase")

public class DevPhaseController {

    @Autowired
    public DevPhaseService devPhaseService;

    @GetMapping("/all")
    public List<DevPhase> getAllDevPhase() {
        return devPhaseService.getAllDevPhase();
    }

    @PostMapping("/add")
    public String addDevPhase(@RequestBody DevPhase devPhase){
        return devPhaseService.addDevPhase(devPhase);
    }

    @PutMapping("/edit/{id}")
    public String editDevPhaseInfo(@PathVariable String id, @RequestBody DevPhase devPhase) {
        return devPhaseService.editDevPhaseInfo(id, devPhase);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteDevPhase(@PathVariable String id) {
        return devPhaseService.logicalDeleteDevPhase(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreDevPhase(@PathVariable String id) {
        return devPhaseService.restoreDevPhase(id);
    }
}