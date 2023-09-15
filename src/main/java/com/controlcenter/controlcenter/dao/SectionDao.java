package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.controlcenter.controlcenter.model.SectionInput;
import com.controlcenter.controlcenter.model.SectionOutput;

@Mapper
public interface SectionDao {
    List<SectionOutput> getAllSection();

    SectionOutput getSectionById(String id);

    void addSection(SectionInput section);

    void editSectionInfo(Map<String, Object> paramMap);

    void logicalDeleteSection(String id);

    void deleteMultipleSection(@Param("ids") List<Long> ids);

    void restoreSection(String id);
}
