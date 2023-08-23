package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.Section;

public interface SectionService {
    public List<Section> getAllSection();
    public String addSection(Section section);
    public String editSectionInfo(String id, Section section);
    public String logicalDeleteSection(String id);

    
}
