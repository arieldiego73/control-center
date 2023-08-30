package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.DepartmentDao;
import com.controlcenter.controlcenter.model.Department;
import com.controlcenter.controlcenter.service.DepartmentService;

@Service
public class DepartmentServiceImpl implements DepartmentService{
    
    @Autowired
    public DepartmentDao departmentDao;

    @Override
    public List<Department> getAllDepartment() {
        return departmentDao.getAllDepartment();
    }

    @Override 
    public String addDepartment(Department department) {
        try {
            departmentDao.addDepartment(department);
            return "Department Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editDepartmentInfo(String id, Department department) {
        try {
            Map<String, Object> paramMap = new HashMap<>();

            paramMap.put("id", id);
            paramMap.put("department", department);

            departmentDao.editDepartmentInfo(paramMap);

            return "Department Edited Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteDepartment(String id) {
        try {
            departmentDao.logicalDeleteDepartment(id);
            return "Department Deleted Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreDepartment(String id) {
        try {
            departmentDao.restoreDepartment(id);
            return "Department Restored Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
