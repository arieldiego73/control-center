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

import com.controlcenter.controlcenter.model.Role;
import com.controlcenter.controlcenter.service.RoleService;

@RestController
@RequestMapping("/role")
public class RoleController {
    
    @Autowired
    public RoleService roleService;

    @GetMapping("/all")
    public List<Role> getAllRole() {
        return roleService.getAllRole();
    }

    @PostMapping("/add")
    public String addRole(@RequestBody Role role) {
        return roleService.addRole(role);
    }

    @PutMapping("/edit/{id}")
    public String editRoleInfo(@PathVariable String id, @RequestBody Role role) {
        return roleService.editRoleInfo(id, role);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteRole(@PathVariable String id) {
        return roleService.logicalDeleteRole(id);
    }
}
