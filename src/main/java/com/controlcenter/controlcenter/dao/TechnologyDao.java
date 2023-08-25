package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.Technology;

@Mapper
public interface TechnologyDao {
    List<Technology> getAllTechnology();
    void addTechnology(Technology technology);
    void editTechnology(Map<String, Object> paramMap);
    void logicalDeleteTechnology(String id);
}
