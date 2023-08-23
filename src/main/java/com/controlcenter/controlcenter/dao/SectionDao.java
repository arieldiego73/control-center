package com.controlcenter.controlcenter.dao;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.Section;

@Mapper
public interface SectionDao {
    List<Section> getAllSection();
    void addSection(Section section0);
    void editSectionInfo(Map<String, Object> paramMap);
    void logicalDeleteSection(Map<String, Object> paramMap);
}
