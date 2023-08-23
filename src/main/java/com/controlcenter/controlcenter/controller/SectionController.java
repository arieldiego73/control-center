package com.controlcenter.controlcenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

}
