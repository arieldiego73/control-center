package com.controlcenter.controlcenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/add")
    public String addPosition(@RequestBody Position position) {
        return positionService.addPosition(position);
    }

    @PutMapping("/edit/{id}")
    public String editPositionInfo(@PathVariable String id, @RequestBody Position position) {
        return positionService.editPositionInfo(id, position);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeltePosition(@PathVariable String id) {
        return positionService.logicalDeletePosition(id);
    }

    @PutMapping("/restore/{id}")
    public String restorePosition(@PathVariable String id) {
        return positionService.restorePosition(id);
    }
}
