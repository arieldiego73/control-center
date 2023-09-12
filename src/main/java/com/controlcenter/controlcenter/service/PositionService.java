package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.PositionInput;
import com.controlcenter.controlcenter.model.PositionOutput;

public interface PositionService {
    public ResponseEntity<List<PositionOutput>> getAllPosition();
    public String addPosition(PositionInput position);
    public String editPositionInfo(String id, PositionInput position);
    public ResponseEntity<String> logicalDeletePosition(String id);
    public ResponseEntity<String> deleteMultiplePosition(
        @RequestParam List<Long> ids
    );
    public ResponseEntity<String> restorePosition(String id);
}
