package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.RoleDao;
import com.controlcenter.controlcenter.model.Role;
import com.controlcenter.controlcenter.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService{
    
    @Autowired 
    public RoleDao roleDao;

    @Override
    public List<Role> getAllRole() {
        return roleDao.getAllRole();
    }

    @Override
    public String addRole(Role role) {
        try {
            roleDao.addRole(role);
            return "Role Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editRoleInfo(String id, Role role) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("role", role);

            roleDao.editRoleInfo(paramMap);

            return "Role Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteRole(String id) {
        try {
            roleDao.logicalDeleteRole(id);

            return "Role Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
