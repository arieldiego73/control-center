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

import com.controlcenter.controlcenter.model.MultiRole;
import com.controlcenter.controlcenter.service.MultiRoleService;

@RestController
@RequestMapping("/multi-role")
public class MultiRoleController {
    
    @Autowired
    public MultiRoleService multiRoleService;

    @GetMapping("/all")
    public List<MultiRole> getAllMultiRole() {
        return multiRoleService.getAllMultiRole();
    }

    @PostMapping("/add")
    public String addMultiRole(@RequestBody MultiRole multiRole){
        return multiRoleService.addMultiRole(multiRole);
    }

    @PutMapping("/edit/{id}")
    public String editMultiRoleInfo(@PathVariable String id, @RequestBody MultiRole multiRole) {
        return multiRoleService.editMultiRoleInfo(id, multiRole);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteMultiRole(@PathVariable String id) {
        return multiRoleService.logicalDeleteMultiRole(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreMultiRole(@PathVariable String id) {
        return multiRoleService.restoreMultiRole(id);
    }

}
