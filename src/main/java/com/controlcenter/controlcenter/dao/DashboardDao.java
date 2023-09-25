package com.controlcenter.controlcenter.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DashboardDao {
    
    Integer countAllOpenProject();
    Integer countAllCloseProject();
    Integer countAllCancelledProject();
}
