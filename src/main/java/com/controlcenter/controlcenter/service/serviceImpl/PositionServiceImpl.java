package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.dao.PositionDao;
import com.controlcenter.controlcenter.model.PositionInput;
import com.controlcenter.controlcenter.model.PositionOutput;
import com.controlcenter.controlcenter.service.PositionService;

@Service
public class PositionServiceImpl implements PositionService{
    
    @Autowired 
    public PositionDao positionDao;

    @Override
    public ResponseEntity<List<PositionOutput>> getAllPosition() {
        return ResponseEntity.ok(positionDao.getAllPosition());
    }

    @Override
    public String addPosition(PositionInput position) {
        try {
            positionDao.addPosition(position);
            return "Position Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editPositionInfo(String id, PositionInput position) {
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
    public ResponseEntity<String> logicalDeletePosition(String id) {
        try {
            positionDao.logicalDeletePosition(id);

            return ResponseEntity.ok("Position Deleted Successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<String> deleteMultiplePosition(@RequestParam List<Long> ids) {
        try {
            positionDao.deleteMultiplePosition(ids);
            return ResponseEntity.ok("Multiple positions are deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<String> restorePosition(String id) {
        try {
            positionDao.restorePosition(id);

            return ResponseEntity.ok("Position Restored Successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
