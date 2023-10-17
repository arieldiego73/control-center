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
import com.controlcenter.controlcenter.model.RecentProjects;
import com.controlcenter.controlcenter.model.TotalUser;
import com.controlcenter.controlcenter.model.UserPerMonth;
import com.controlcenter.controlcenter.model.UserStatusGraph;
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

    @Override
    public ResponseEntity<Integer> countAllUserWithStatusOfBusinessPartner() {
        Integer totalUserWithStatusOfBusinessPartner = dashboardDao.countAllUserWithStatusOfBusinessPartner();

        if(totalUserWithStatusOfBusinessPartner != null) {
            return ResponseEntity.ok(totalUserWithStatusOfBusinessPartner);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Integer> countAllUserWithStatusOfIntern() {
        Integer totalUserWithStatusOfIntern = dashboardDao.countAllUserWithStatusOfIntern();

        if(totalUserWithStatusOfIntern != null) {
            return ResponseEntity.ok(totalUserWithStatusOfIntern);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Integer> countAllUserWithStatusOfRegular() {
        Integer totalUserWithStatusOfRegular = dashboardDao.countAllUserWithStatusOfRegular();

        if(totalUserWithStatusOfRegular != null) {
            return ResponseEntity.ok(totalUserWithStatusOfRegular);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Integer> countAllUserWithStatusOfTrainee() {
        Integer totalUserWithStatusOfTrainee = dashboardDao.countAllUserWithStatusOfTrainee();

        if(totalUserWithStatusOfTrainee != null) {
            return ResponseEntity.ok(totalUserWithStatusOfTrainee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Integer> countAllProjectByStatus(String proj_status_id) {
        Integer totalCountOfProjectByStatus = dashboardDao.countAllProjectByStatus(proj_status_id);

        if(totalCountOfProjectByStatus != null) {
            return ResponseEntity.ok(totalCountOfProjectByStatus);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<TotalUser> countAllUser() {
        TotalUser totalCountOfUserByStatus = dashboardDao.countAllUser();

        if(totalCountOfUserByStatus != null) {
            return ResponseEntity.ok(totalCountOfUserByStatus);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<List<Map<String, Object>>> getAllProjectCountByStatus() {
        List<Map<String, Object>> resultMap = dashboardDao.getAllProjectCountByStatus();

        resultMap.stream()
        .map(result -> {
            Map<String, Object> projectCount = new HashMap<>();
            projectCount.put("result", resultMap);
            return projectCount;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(resultMap);
    }

    @Override
    public ResponseEntity<List<Map<String, Object>>> getAllUserCountByStatus() {
        List<Map<String, Object>> resultMap = dashboardDao.getAllUserCountByStatus();

        resultMap.stream()
        .map(result -> {
            Map<String, Object> userCount = new HashMap<>();
            userCount.put("result", resultMap);
            return userCount;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(resultMap);
    }

    @Override
    public ResponseEntity<List<Map<String, Object>>> graphData() {

        List<Map<String, Object>> graphList = new ArrayList<>();
        Map<String, Object> graphData = new HashMap<>();

        // Print the current month as a string (full name)
        TotalUser totalUserCount = dashboardDao.countAllUser();
        UserPerMonth userPerYearAndMonth = dashboardDao.countAllUserPerYearAndMonth();
        List<Map<String, Object>> projectStatusGraph = dashboardDao.getAllProjectCountByStatus();
        List<UserStatusGraph> userStatusGraph = dashboardDao.getAllUserStatusCountPerYearAndMonth();
        List<RecentProjects> recentProjectGraph = dashboardDao.getRecentProjects();
        
        graphData.put("user_per_month", userPerYearAndMonth);
        graphData.put("total_user_count", totalUserCount);
        graphData.put("project_status", projectStatusGraph);
        graphData.put("user_status", userStatusGraph);
        graphData.put("recent_projects", recentProjectGraph);

        graphList.add(graphData);
        return ResponseEntity.ok(graphList);
    }

    @Override
    public ResponseEntity<List<Integer>> yearAndMonthFromUserTable() {
        return ResponseEntity.ok(dashboardDao.yearAndMonthFromUserTable());
    }

    @Override
    public ResponseEntity<List<Map<String, Object>>> getAllUserStatusCountByMonth(String month) {
        return ResponseEntity.ok(dashboardDao.getAllUserStatusCountByMonth(month));
    }

    @Override
    public ResponseEntity<List<UserStatusGraph>> getAllUserStatusCountPerYearAndMonth() {
        return ResponseEntity.ok(dashboardDao.getAllUserStatusCountPerYearAndMonth());
    }

    @Override 
    public ResponseEntity<List<RecentProjects>> getRecentProjects() {
        return ResponseEntity.ok(dashboardDao.getRecentProjects());
    }

    @Override
    public ResponseEntity<UserPerMonth> countAllUserPerYearAndMonth() {
        return ResponseEntity.ok(dashboardDao.countAllUserPerYearAndMonth());
    }

}
