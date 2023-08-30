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

import com.controlcenter.controlcenter.model.DevType;
import com.controlcenter.controlcenter.service.DevTypeService;

@RestController
@RequestMapping("/dev-type")
public class DevTypeController {
    
    @Autowired
    public DevTypeService devTypeService;

    @GetMapping("/all")
    public List<DevType> getAllDevType() {
        return devTypeService.getAllDevType();
    }

    @PostMapping("/add")
    public String addDevType(@RequestBody DevType devType){
        return devTypeService.addDevType(devType);
    }

    @PutMapping("/edit/{id}")
    public String editDevTypeInfo(@PathVariable String id, @RequestBody DevType devType) {
        return devTypeService.editDevTypeInfo(id, devType);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteDevType(@PathVariable String id) {
        return devTypeService.logicalDeleteDevType(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreDevType(@PathVariable String id) {
        return devTypeService.restoreDevType(id);
    }
}
