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

import com.controlcenter.controlcenter.model.UserProject;
import com.controlcenter.controlcenter.service.UserProjectService;

@RestController
@RequestMapping("/user-project")
public class UserProjectController {
    
    @Autowired
    public UserProjectService userProjectService;

    @GetMapping("/all")
    public List<UserProject> getAllUserProject() {
        return userProjectService.getAllUserProject();
    }

    @PostMapping("/add")
    public String addUserProject(@RequestBody UserProject userProject){
        return userProjectService.addUserProject(userProject);
    }

    @PutMapping("/edit/{id}")
    public String editUserProjectInfo(@PathVariable String id, @RequestBody UserProject userProject) {
        return userProjectService.editUserProjectInfo(id, userProject);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteUserProject(@PathVariable String id) {
        return userProjectService.logicalDeleteUserProject(id);
    }
}