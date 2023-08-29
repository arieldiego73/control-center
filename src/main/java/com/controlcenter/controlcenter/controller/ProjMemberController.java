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

import com.controlcenter.controlcenter.model.ProjMember;
import com.controlcenter.controlcenter.service.ProjMemberService;

@RestController
@RequestMapping("/proj-member")
public class ProjMemberController {

    @Autowired
    public ProjMemberService projMemberService;

    @GetMapping("/all")
    public List<ProjMember> getAllProjMember() {
        return projMemberService.getAllProjMember();
    }

    @PostMapping("/add")
    public String addProjMember(@RequestBody ProjMember projMember){
        return projMemberService.addProjMember(projMember);
    }

    @PutMapping("/edit/{id}")
    public String editProjMemberInfo(@PathVariable String id, @RequestBody ProjMember projMember) {
        return projMemberService.editProjMemberInfo(id, projMember);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteProjMember(@PathVariable String id) {
        return projMemberService.logicalDeleteProjMember(id);
    }
}

