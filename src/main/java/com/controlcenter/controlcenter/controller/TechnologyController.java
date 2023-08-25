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

import com.controlcenter.controlcenter.model.Technology;
import com.controlcenter.controlcenter.service.TechnologyService;

@RestController
@RequestMapping("/technology")
public class TechnologyController {
    
    @Autowired
    public TechnologyService technologyService;

    @GetMapping("/all")
    public List<Technology> getAllTechnology() {
        return technologyService.getAllTechnology();
    }

    @PostMapping("/add")
    public String addTechnology(@RequestBody Technology technology) {
        return technologyService.addTechnology(technology);
    }

    @PutMapping("/edit/{id}")
    public String editTechnology(@PathVariable String id, @RequestBody Technology technology) {
        return technologyService.editTechnology(id, technology);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteTechnology(@PathVariable String id) {
        return technologyService.logicalDeleteTechnology(id);
    }
}
