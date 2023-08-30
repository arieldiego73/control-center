package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.PositionDao;
import com.controlcenter.controlcenter.model.Position;
import com.controlcenter.controlcenter.service.PositionService;

@Service
public class PositionServiceImpl implements PositionService{
    
    @Autowired 
    public PositionDao positionDao;

    @Override
    public List<Position> getAllPosition() {
        return positionDao.getAllPosition();
    }

    @Override
    public String addPosition(Position position) {
        try {
            positionDao.addPosition(position);
            return "Position Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editPositionInfo(String id, Position position) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("position", position);

            positionDao.editPositionInfo(paramMap);

            return "Position Info Edited Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeletePosition(String id) {
        try {
            positionDao.logicalDeletePosition(id);

            return "Position Deleted Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restorePosition(String id) {
        try {
            positionDao.restorePosition(id);

            return "Position Restored Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
