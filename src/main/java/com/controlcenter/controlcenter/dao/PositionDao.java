package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.PositionInput;
import com.controlcenter.controlcenter.model.PositionOutput;

@Mapper
public interface PositionDao {
    List<PositionOutput> getAllPosition();
    void addPosition(PositionInput position);
    void editPositionInfo(Map<String, Object> paramMap);
    void logicalDeletePosition(String id);
    void restorePosition(String id);
}
