package com.controlcenter.controlcenter.dao;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.Section;
import java.util.List;







@Mapper
public interface SectionDao {
    List<Section> getAllSection();
}
