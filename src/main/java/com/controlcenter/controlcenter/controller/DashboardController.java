package com.controlcenter.controlcenter.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.RecentProjects;
import com.controlcenter.controlcenter.model.TotalUser;
import com.controlcenter.controlcenter.model.UserPerMonth;
import com.controlcenter.controlcenter.model.UserStatusGraph;
import com.controlcenter.controlcenter.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    
    @Autowired
    public DashboardService dashboardService;

    @GetMapping("/open-project")
    public ResponseEntity<Integer> countAllOpenProject() {
        try {
            return dashboardService.countAllOpenProject();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/close-project")
    public ResponseEntity<Integer> countAllCloseProject() {
        try {
            return dashboardService.countAllCloseProject();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/cancelled-project")
    public ResponseEntity<Integer> countAllCancelledProject() {
        try {
            return dashboardService.countAllCancelledProject();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/business-partner")
    public ResponseEntity<Integer> countAllUserWithStatusOfBusinessPartner() {
        try {
            return dashboardService.countAllUserWithStatusOfBusinessPartner();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/intern")
    public ResponseEntity<Integer> countAllUserWithStatusOfIntern() {
        try {
            return dashboardService.countAllUserWithStatusOfIntern();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/regular")
    public ResponseEntity<Integer> countAllUserWithStatusOfRegular() {
        try {
            return dashboardService.countAllUserWithStatusOfRegular();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/trainee")
    public ResponseEntity<Integer> countAllUserWithStatusOfTrainee() {
        try {
            return dashboardService.countAllUserWithStatusOfTrainee();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/project-count/{proj_status_id}")
    public ResponseEntity<Integer> countAllProjectByStatus(@PathVariable String proj_status_id) {
        try {
            return dashboardService.countAllProjectByStatus(proj_status_id);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/total-user-count")
    public ResponseEntity<TotalUser> countAllUser() {
        try {
            return dashboardService.countAllUser();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/all-project-count")
    public ResponseEntity<List<Map<String, Object>>> getAllProjectCountByStatus() {
        try {
            return dashboardService.getAllProjectCountByStatus();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/all-user-count")
    public ResponseEntity<List<Map<String, Object>>> getAllUserCountByStatus() {
        try {
            return dashboardService.getAllUserCountByStatus();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/graph-data")
    public ResponseEntity<List<Map<String, Object>>> graphData() {
        try {
            return dashboardService.graphData();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/month-and-year") 
    public ResponseEntity<List<Integer>> yearAndMonthFromUserTable() {
        try {
            return dashboardService.yearAndMonthFromUserTable();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user-status-count-per-month/{month}")
    public ResponseEntity<List<Map<String, Object>>> getAllUserStatusCountByMonth(@PathVariable String month) {
        try {
            return dashboardService.getAllUserStatusCountByMonth(month);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user-status-graph")
    public ResponseEntity<List<UserStatusGraph>> getAllUserStatusCountPerYearAndMonth() {
        try {
            return dashboardService.getAllUserStatusCountPerYearAndMonth();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/recent-projects")
    public ResponseEntity<List<RecentProjects>> getRecentProjects() {
        try {
            return dashboardService.getRecentProjects();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user-count")
    public ResponseEntity<UserPerMonth> countAllUserPerYearAndMonth(){
        return dashboardService.countAllUserPerYearAndMonth();
    }
}
