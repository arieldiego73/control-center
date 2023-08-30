package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.PositionInput;
import com.controlcenter.controlcenter.model.PositionOutput;

public interface PositionService {
    public List<PositionOutput> getAllPosition();
    public String addPosition(PositionInput position);
    public String editPositionInfo(String id, PositionInput position);
    public String logicalDeletePosition(String id);
    public String restorePosition(String id);
}
