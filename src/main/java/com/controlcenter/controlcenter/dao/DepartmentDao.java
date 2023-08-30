package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.DepartmentInput;
import com.controlcenter.controlcenter.model.DepartmentOutput;

@Mapper
public interface DepartmentDao {
    List<DepartmentOutput> getAllDepartment();
    void addDepartment(DepartmentInput department);
    void editDepartmentInfo(Map<String, Object> paramMap);
    void logicalDeleteDepartment(String id);

    void restoreDepartment(String id);
}
