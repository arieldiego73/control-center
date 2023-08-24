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

import com.controlcenter.controlcenter.model.Project;
import com.controlcenter.controlcenter.service.ProjectService;

@RestController
@RequestMapping("/project")
public class ProjectController {
    
    @Autowired
    public ProjectService projectService;

    @GetMapping("/all")
    public List<Project> getAllProject() {
        return projectService.getAllProject();
    }

    @PostMapping("/add")
    public String addProject(@RequestBody Project project){
        return projectService.addProject(project);
    }

    @PutMapping("/edit/{id}")
    public String editProjectInfo(@PathVariable String id, @RequestBody Project project) {
        return projectService.editProjectInfo(id, project);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteProject(@PathVariable String id) {
        return projectService.logicalDeleteProject(id);
    }
}
