package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.SectionInput;
import com.controlcenter.controlcenter.model.SectionOutput;

public interface SectionService {
    public List<SectionOutput> getAllSection();

    public SectionOutput getSectionById(String id);

    public String addSection(SectionInput section);

    public String editSectionInfo(String id, SectionInput section);

    public String logicalDeleteSection(String id);

    public String deleteMultipleSection(@RequestParam List<Long> ids);

    public String restoreSection(String id);
}
