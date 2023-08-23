package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.Department;

public interface DepartmentService {
    public List<Department> getAllDepartment();
    public String addDepartment(Department department);
    public String editDepartmentInfo(String id, Department department);
    public String logicalDeleteDepartment(String id);
}
