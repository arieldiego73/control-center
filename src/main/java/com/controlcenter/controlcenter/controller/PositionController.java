package com.controlcenter.controlcenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.Position;
import com.controlcenter.controlcenter.service.PositionService;

@RestController
@RequestMapping("/position")
public class PositionController {
    
    @Autowired
    public PositionService positionService;

    @GetMapping("/all")
    public List<Position> getAllPosition() {
        return positionService.getAllPosition();
    }

}
