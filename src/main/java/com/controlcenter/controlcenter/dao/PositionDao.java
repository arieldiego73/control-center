package com.controlcenter.controlcenter.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.Position;

@Mapper
public interface PositionDao {
    List<Position> getAllPosition();
}
