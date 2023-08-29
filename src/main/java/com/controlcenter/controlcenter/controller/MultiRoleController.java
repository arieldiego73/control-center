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
@RequestMapping("/multirole")
public class MultiRoleController {
    
    @Autowired
    public MultiRoleService multiroleService;

    @GetMapping("/all")
    public List<MultiRole> getAllMultiRole() {
        return multiroleService.getAllMultiRole();
    }

    @PostMapping("/add")
    public String addMultiRole(@RequestBody MultiRole multirole){
        return multiroleService.addMultiRole(multirole);
    }

    @PutMapping("/edit/{id}")
    public String editMultiRoleInfo(@PathVariable String id, @RequestBody MultiRole multirole) {
        return multiroleService.editMultiRoleInfo(id, multirole);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteMultiRole(@PathVariable String id) {
        return multiroleService.logicalDeleteMultiRole(id);
    }

}
