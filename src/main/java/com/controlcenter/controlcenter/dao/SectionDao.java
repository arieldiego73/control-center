package com.controlcenter.controlcenter.dao;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.SectionInput;
import com.controlcenter.controlcenter.model.SectionOutput;

@Mapper
public interface SectionDao {
    List<SectionOutput> getAllSection();
    void addSection(SectionInput section);
    void editSectionInfo(Map<String, Object> paramMap);
    void logicalDeleteSection(String id);
    void restoreSection(String id);
}
