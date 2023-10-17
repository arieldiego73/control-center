package com.controlcenter.controlcenter.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.controlcenter.controlcenter.model.RecentProjects;
import com.controlcenter.controlcenter.model.TotalUser;
import com.controlcenter.controlcenter.model.UserPerMonth;
import com.controlcenter.controlcenter.model.UserStatusGraph;

public interface DashboardService {
    
    public ResponseEntity<Integer> countAllOpenProject();
    public ResponseEntity<Integer> countAllCloseProject();
    public ResponseEntity<Integer> countAllCancelledProject();
    public ResponseEntity<List<Map<String, Object>>> countAllRegisteredUserPerYear();
    public ResponseEntity<Integer> countAllUserWithStatusOfBusinessPartner();
    public ResponseEntity<Integer> countAllUserWithStatusOfIntern();
    public ResponseEntity<Integer> countAllUserWithStatusOfRegular();
    public ResponseEntity<Integer> countAllUserWithStatusOfTrainee();

    public ResponseEntity<Integer> countAllProjectByStatus(String proj_status_id);
    public ResponseEntity<TotalUser> countAllUser();
    public ResponseEntity<List<Map<String, Object>>> getAllProjectCountByStatus();
    public ResponseEntity<List<Map<String, Object>>> getAllUserCountByStatus();

    public ResponseEntity<List<Map<String, Object>>> graphData();

    public ResponseEntity<List<Integer>> yearAndMonthFromUserTable();

    public ResponseEntity<List<Map<String, Object>>> getAllUserStatusCountByMonth(String month);

    public ResponseEntity<List<UserStatusGraph>> getAllUserStatusCountPerYearAndMonth();

    public ResponseEntity<List<RecentProjects>> getRecentProjects();

    public ResponseEntity<UserPerMonth> countAllUserPerYearAndMonth();
}
