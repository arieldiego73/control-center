package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.Role;

@Mapper
public interface RoleDao {
    List<Role> getAllRole();
    void addRole(Role role);
    void editRoleInfo(Map<String, Object> paramMap);
    void logicalDeleteRole(String id);
}
