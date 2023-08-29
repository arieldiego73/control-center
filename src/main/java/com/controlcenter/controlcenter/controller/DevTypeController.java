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
@RequestMapping("/devtype")
public class DevTypeController {
    
    @Autowired
    public DevTypeService devtypeService;

    @GetMapping("/all")
    public List<DevType> getAllDevType() {
        return devtypeService.getAllDevType();
    }

    @PostMapping("/add")
    public String addDevType(@RequestBody DevType devtype){
        return devtypeService.addDevType(devtype);
    }

    @PutMapping("/edit/{id}")
    public String editDevTypeInfo(@PathVariable String id, @RequestBody DevType devtype) {
        return devtypeService.editDevTypeInfo(id, devtype);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteDevType(@PathVariable String id) {
        return devtypeService.logicalDeleteDevType(id);
    }
}
