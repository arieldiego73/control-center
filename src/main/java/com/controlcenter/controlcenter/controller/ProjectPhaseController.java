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

import com.controlcenter.controlcenter.model.ProjectPhase;
import com.controlcenter.controlcenter.service.ProjectPhaseService;

@RestController
@RequestMapping("/project-phase")
public class ProjectPhaseController {
    
    @Autowired
    ProjectPhaseService projectPhaseService;

    @GetMapping("/all")
    public List<ProjectPhase> getAllProjectPhase(){
        return projectPhaseService.getAllProjectPhase();
    }

    @PostMapping("/add")
    public String addProjectPhase(@RequestBody ProjectPhase projectPhase){
        return projectPhaseService.addProjectPhase(projectPhase);
    }

    @PutMapping("/edit/{id}")
    public String editProjectPhase(@PathVariable String id, @RequestBody ProjectPhase projectPhase){
        return projectPhaseService.editProjectPhase(id, projectPhase);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteProjectPhase(@PathVariable String id){
        return projectPhaseService.logicalDeleteProjectPhase(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreProjectPhase(@PathVariable String id){
        return projectPhaseService.restoreProjectPhase(id);
    }
    
}
