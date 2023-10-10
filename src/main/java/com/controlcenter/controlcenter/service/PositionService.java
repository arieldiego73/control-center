package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.PositionInput;
import com.controlcenter.controlcenter.model.PositionOutput;

public interface PositionService {
    public ResponseEntity<List<PositionOutput>> getAllPosition();
    
    public PositionOutput getPositionById(String id);

    public String addPosition(PositionInput position, String emp_id);

    public ResponseEntity<String> editPositionInfo(String id, PositionInput position, String emp_id);

    public String logicalDeletePosition(String id, String emp_id);

    public String deleteMultiplePosition(@RequestParam List<Long> ids, String emp_id);

    public String restorePosition(String id);
}
 