package com.controlcenter.controlcenter.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProjectManagerDao {
    void addManagers(Long proj_id, String emp_id);
}
