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

import com.controlcenter.controlcenter.model.ProjectStatus;
import com.controlcenter.controlcenter.service.ProjectStatusService;

@RestController
@RequestMapping("/project-status")
public class ProjectStatusController {
    @Autowired
    public ProjectStatusService projectStatusService;

    @GetMapping("/all")
    public List<ProjectStatus> getAllProjectStatus() {
        return projectStatusService.getAllProjectStatus();
    }

    @PostMapping("/add")
    public String addProjectStatus(@RequestBody ProjectStatus projectStatus){
        return projectStatusService.addProjectStatus(projectStatus);
    }

    @PutMapping("/edit/{id}")
    public String editProjectStatus(@PathVariable String id, @RequestBody ProjectStatus projectStatus) {
        return projectStatusService.editProjectStatus(id, projectStatus);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteProjectStatus(@PathVariable String id) {
        return projectStatusService.logicalDeleteProjectStatus(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreProjectStatus(@PathVariable String id) {
        return projectStatusService.restoreProjectStatus(id);
    }
}
