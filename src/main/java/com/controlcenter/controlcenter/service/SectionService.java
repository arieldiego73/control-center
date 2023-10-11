package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.SectionInput;
import com.controlcenter.controlcenter.model.SectionOutput;

public interface SectionService {
    public ResponseEntity<List<SectionOutput>> getAllSection();

    public SectionOutput getSectionById(String id);

    public String addSection(SectionInput section, String emp_id);

    public ResponseEntity<String> editSectionInfo(String id, SectionInput section, String emp_id);

    public String logicalDeleteSection(String id, String emp_id);

    public String deleteMultipleSection(@RequestParam List<Long> ids, String emp_id);

    public String restoreSection(String id);
}
