package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.controlcenter.controlcenter.model.DepartmentInput;
import com.controlcenter.controlcenter.model.DepartmentOutput;

@Mapper
public interface DepartmentDao {
    List<DepartmentOutput> getAllDepartment();
    DepartmentOutput getDepartmentById(String id);
    void addDepartment(DepartmentInput department);
    void editDepartmentInfo(Map<String, Object> paramMap);
    void logicalDeleteDepartment(String id);
    void deleteMultipleDepartment(@Param("ids") List<Long> ids);
    void restoreDepartment(String id);
}
