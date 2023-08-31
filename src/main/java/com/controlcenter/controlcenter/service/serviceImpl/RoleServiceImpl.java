package com.controlcenter.controlcenter.service.serviceImpl;

import com.controlcenter.controlcenter.dao.RoleDao;
import com.controlcenter.controlcenter.model.Role;
import com.controlcenter.controlcenter.service.RoleService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

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
      return "Role added successfully.";
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

      return "Role edited successfully.";
    } catch (Exception e) {
      return e.getMessage();
    }
  }

  @Override
  public String logicalDeleteRole(String id) {
    try {
      roleDao.logicalDeleteRole(id);
      return "Role deleted successfully.";
    } catch (Exception e) {
      return e.getMessage();
    }
  }

  @Override
  public String restoreRole(String id) {
    try {
      roleDao.restoreRole(id);
      return "Role restored successfully.";
    } catch (Exception e) {
      return e.getMessage();
    }
  }

  @Override
  public String deleteMultipleRole(List<Long> ids) {
    try {
      roleDao.deleteMultipleRole(ids);
      return "Roles Deleted Successfully.";
    } catch (Exception e) {
      return e.getMessage();
    }
  }
}
