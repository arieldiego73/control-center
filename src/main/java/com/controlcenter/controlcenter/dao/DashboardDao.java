package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

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
}
