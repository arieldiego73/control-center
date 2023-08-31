package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.Role;

public interface RoleService {
    public List<Role> getAllRole();
    public String addRole(Role role);
    public String editRoleInfo(String id, Role role);
    public String logicalDeleteRole(String id);
    public String restoreRole(String id);
    public String deleteMultipleRole(@RequestParam List<Long> ids);
}
