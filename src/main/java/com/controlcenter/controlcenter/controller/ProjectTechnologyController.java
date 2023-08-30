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

import com.controlcenter.controlcenter.model.ProjectTechnology;
import com.controlcenter.controlcenter.service.ProjectTechnologyService;

@RestController
@RequestMapping("/project-technology")
public class ProjectTechnologyController {
    @Autowired
    public ProjectTechnologyService projectTechnologyService;

    @GetMapping("/all")
    public List<ProjectTechnology> getProjectTechnology(){
        return projectTechnologyService.getAllProjectTechnology();
    }

    @PostMapping("/add")
    public String addProjectTechnology(@RequestBody ProjectTechnology projectTechnology){
        return projectTechnologyService.addProjectTechnology(projectTechnology);
    }

    @PutMapping("/edit/{id}")
    public String editProjectTechnology(@PathVariable String id, @RequestBody ProjectTechnology projectTechnology){
        return projectTechnologyService.editProjectTechnology(id, projectTechnology);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteProjectTechnology(@PathVariable String id){
        return projectTechnologyService.logicalDeleteProjectTechnology(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreProjectTechnology(@PathVariable String id){
        return projectTechnologyService.restoreProjectTechnology(id);
    }
}
