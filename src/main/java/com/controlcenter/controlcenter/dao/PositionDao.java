package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.controlcenter.controlcenter.model.PositionInput;
import com.controlcenter.controlcenter.model.PositionOutput;

@Mapper
public interface PositionDao {
    List<PositionOutput> getAllPosition();

    PositionOutput getPositionById(String id);

    void addPosition(PositionInput position);

    void editPositionInfo(Map<String, Object> paramMap);

    void logicalDeletePosition(String id);

    void deleteMultiplePosition(@Param("ids") List<Long> ids);

    void restorePosition(String id);
}
