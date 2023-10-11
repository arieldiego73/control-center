package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.DepartmentInput;
import com.controlcenter.controlcenter.model.DepartmentOutput;

public interface DepartmentService {
    public ResponseEntity<List<DepartmentOutput>> getAllDepartment();
    public DepartmentOutput getDepartmentById(String id);
    public String addDepartment(DepartmentInput department, String emp_id);
    public ResponseEntity<String> editDepartmentInfo(String id, DepartmentInput department, String emp_id);
    public String logicalDeleteDepartment(String id, String emp_id);
    public String deleteMultipleDepartment(@RequestParam List<Long> ids, String emp_id);
    public String restoreDepartment(String id);
}

