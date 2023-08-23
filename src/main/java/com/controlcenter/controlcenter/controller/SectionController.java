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

import com.controlcenter.controlcenter.model.Section;
import com.controlcenter.controlcenter.service.SectionService;

@RestController
@RequestMapping("/section")

public class SectionController {
       
    @Autowired
    public SectionService sectionService;

    @GetMapping("/all")
    public List<Section> getAllSection() {
        return sectionService.getAllSection();
    }

    @PostMapping("/add")
    public String addSection(@RequestBody Section section){
        return sectionService.addSection(section);
    }

    @PutMapping("/edit/{id}")
    public String editSectionInfo(@PathVariable String id, @RequestBody Section section) {
        return sectionService.editSectionInfo(id, section);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteSection(@PathVariable String id, @RequestBody Section section) {
        return sectionService.logicalDeleteSection(id);
    }
}
