package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.TechnologyInput;
import com.controlcenter.controlcenter.model.TechnologyOutput;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface TechnologyDao {
    List<TechnologyOutput> getAllTechnology();

    TechnologyOutput getTechnologyById(String id);

    void addTechnology(TechnologyInput technology);

    void editTechnology(Map<String, Object> paramMap);

    void logicalDeleteTechnology(String id);

    void deleteMultipleTechnology(@Param("ids") List<Long> ids);

    void restoreTechnology(String id);
}
