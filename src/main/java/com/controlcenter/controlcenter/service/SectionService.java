package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.SectionInput;
import com.controlcenter.controlcenter.model.SectionOutput;

public interface SectionService {
    public List<SectionOutput> getAllSection();
    public String addSection(SectionInput section);
    public String editSectionInfo(String id, SectionInput section);
    public String logicalDeleteSection(String id);
    public String restoreSection(String id);    
}
