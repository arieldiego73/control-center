package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.Position;

public interface PositionService {
    public List<Position> getAllPosition();
    public String addPosition(Position position);
    public String editPositionInfo(String id, Position position);
    public String logicalDeletePosition(String id);
}
