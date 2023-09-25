package com.controlcenter.controlcenter.service.serviceImpl;

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
}
