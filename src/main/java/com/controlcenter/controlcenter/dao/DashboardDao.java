package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.RecentProjects;
import com.controlcenter.controlcenter.model.UserPerYearAndMonth;
import com.controlcenter.controlcenter.model.UserStatusGraph;

@Mapper
public interface DashboardDao {
    
    Integer countAllOpenProject();
    Integer countAllCloseProject();
    Integer countAllCancelledProject();

    List<Map<String, Object>> countAllRegisteredUserPerYear();

    Integer countAllUserWithStatusOfBusinessPartner();
    Integer countAllUserWithStatusOfIntern();
    Integer countAllUserWithStatusOfRegular();
    Integer countAllUserWithStatusOfTrainee();

    Integer countAllProjectByStatus(String proj_status_id);

    Integer countAllUserByStatus(String user_status_code);
    List<Map<String, Object>> getAllProjectCountByStatus();

    List<Map<String, Object>> getAllUserCountByStatus();

    List<Integer> yearAndMonthFromUserTable();

    List<Map<String, Object>> getAllUserStatusCountByMonth(String month);

    List<UserStatusGraph> getAllUserStatusCountPerYearAndMonth();
    List<RecentProjects> getRecentProjects();

    List<UserPerYearAndMonth> countAllUserPerYearAndMonth();
}
