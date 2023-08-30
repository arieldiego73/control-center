package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.Position;

@Mapper
public interface PositionDao {
    List<Position> getAllPosition();
    void addPosition(Position position);
    void editPositionInfo(Map<String, Object> paramMap);
    void logicalDeletePosition(String id);
    void restorePosition(String id);
}
