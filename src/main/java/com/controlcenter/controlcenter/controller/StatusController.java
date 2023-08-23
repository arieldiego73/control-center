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

import com.controlcenter.controlcenter.model.Status;
import com.controlcenter.controlcenter.service.StatusService;

@RestController
@RequestMapping("/status")
public class StatusController {
    
    @Autowired
    public StatusService statusService;

    @GetMapping("/all")
    public List<Status> getAllStatus(){
        return statusService.getAllStatus();
    }

    @PostMapping("/add")
    public String addStatus(@RequestBody Status status){
        return statusService.addStatus(status);
    }

    @PutMapping("/edit/{code}")
    public String editStatusInfo(@PathVariable String code, @RequestBody Status status){
        return statusService.editStatusInfo(code, status);
    }
    
    @PutMapping("/delete/{code}")
    public String logicalDeleteStatus(@PathVariable String code){
        return statusService.logicalDeleteStatus(code);
    }
}
