package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.TechnologyInput;
import com.controlcenter.controlcenter.model.TechnologyOutput;

@Mapper
public interface TechnologyDao {
    List<TechnologyOutput> getAllTechnology();
    void addTechnology(TechnologyInput technology);
    void editTechnology(Map<String, Object> paramMap);
    void logicalDeleteTechnology(String id);
}
