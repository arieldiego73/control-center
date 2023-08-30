package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.Department;

@Mapper
public interface DepartmentDao {
    List<Department> getAllDepartment();
    void addDepartment(Department department);
    void editDepartmentInfo(Map<String, Object> paramMap);
    void logicalDeleteDepartment(String id);

    void restoreDepartment(String id);
}
