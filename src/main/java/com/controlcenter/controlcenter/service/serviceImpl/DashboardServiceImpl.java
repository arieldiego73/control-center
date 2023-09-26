package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.DashboardDao;
import com.controlcenter.controlcenter.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService{
    
    @Autowired
    public DashboardDao dashboardDao;

    @Override
    public ResponseEntity<Integer> countAllOpenProject() {
        Integer totalOpenProjects = dashboardDao.countAllOpenProject();

        if(totalOpenProjects != null) {
            return ResponseEntity.ok(totalOpenProjects);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Integer> countAllCloseProject() {
        Integer totalClosedProjects = dashboardDao.countAllCloseProject();

        if(totalClosedProjects != null) {
            return ResponseEntity.ok(totalClosedProjects);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Integer> countAllCancelledProject() {
        Integer totalCancelledProjects = dashboardDao.countAllCancelledProject();

        if(totalCancelledProjects != null) {
            return ResponseEntity.ok(totalCancelledProjects);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<List<Map<String, Object>>> countAllRegisteredUserPerYear() {
        
        
        List<Map<String, Object>> resultMap = dashboardDao.countAllRegisteredUserPerYear();

        resultMap.stream()
        .map(result -> {
            Map<String, Object> userCount = new HashMap<>();
            userCount.put("result", resultMap);
            return userCount;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(resultMap);
    }
}