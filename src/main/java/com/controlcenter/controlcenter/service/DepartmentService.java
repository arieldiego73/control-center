package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.DepartmentInput;
import com.controlcenter.controlcenter.model.DepartmentOutput;

public interface DepartmentService {
    public List<DepartmentOutput> getAllDepartment();
    public String addDepartment(DepartmentInput department);
    public String editDepartmentInfo(String id, DepartmentInput department);
    public String logicalDeleteDepartment(String id);
    public String restoreDepartment(String id);
}
