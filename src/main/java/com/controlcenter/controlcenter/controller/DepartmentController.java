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

import com.controlcenter.controlcenter.model.DepartmentInput;
import com.controlcenter.controlcenter.model.DepartmentOutput;
import com.controlcenter.controlcenter.service.DepartmentService;

@RestController
@RequestMapping("/department")
public class DepartmentController {
    
    @Autowired
    public DepartmentService departmentService;

    @GetMapping("/all")
    public List<DepartmentOutput> getAllDepartment() {
        return departmentService.getAllDepartment();
    }

    @PostMapping("/add")
    public String addDepartment(@RequestBody DepartmentInput department) {
        return departmentService.addDepartment(department);
    }

    @PutMapping("/edit/{id}")
    public String editDepartmentInfo(@PathVariable String id, @RequestBody DepartmentInput department) {
        return departmentService.editDepartmentInfo(id, department);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteDepartment(@PathVariable String id) {
        return departmentService.logicalDeleteDepartment(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreDepartment(@PathVariable String id) {
        return departmentService.restoreDepartment(id);
    }
}
