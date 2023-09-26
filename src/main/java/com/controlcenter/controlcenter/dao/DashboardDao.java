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
}
