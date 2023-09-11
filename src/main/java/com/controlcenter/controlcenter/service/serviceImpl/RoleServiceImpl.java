package com.controlcenter.controlcenter.service.serviceImpl;

import com.controlcenter.controlcenter.dao.RoleDao;
import com.controlcenter.controlcenter.model.RoleOutput;
import com.controlcenter.controlcenter.model.RoleInput;
import com.controlcenter.controlcenter.service.RoleService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

  @Autowired
  public RoleDao roleDao;

  public List<RoleOutput> allRoles = new ArrayList<RoleOutput>();

  @Override
  public List<RoleOutput> getAllRole() {
    return roleDao.getAllRole();
  }

  @Override
  public String addRole(RoleInput role) {
    try {
      roleDao.addRole(role);
      return "Role Added Successfully";
    } catch (Exception e) {
      return e.getMessage();
    }
  }
  // try {
  //     roleDao.addRole(role);
  //     allRoles = getAllRole();
  //     return ResponseEntity.ok(allRoles);
  //   } catch (Exception e) {
  //     allRoles = new ArrayList<Role>();
  //     return ResponseEntity.badRequest().body(allRoles);
  //   }

  @Override
  public String editRoleInfo(String id, RoleInput role) {
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
  // try {
  //     Map<String, Object> paramMap = new HashMap<>();
  //     paramMap.put("id", id);
  //     paramMap.put("role", role);

  //     roleDao.editRoleInfo(paramMap);
  //     allRoles = getAllRole();
  //     return ResponseEntity.ok(allRoles);
  //   } catch (Exception e) {
  //     allRoles = new ArrayList<Role>();
  //     return ResponseEntity.badRequest().body(allRoles);
  //   }

  @Override
  public ResponseEntity<List<RoleOutput>> logicalDeleteRole(String id) {
    try {
      roleDao.logicalDeleteRole(id);
      allRoles = getAllRole();
      return ResponseEntity.ok(allRoles);
    } catch (Exception e) {
      allRoles = new ArrayList<RoleOutput>();
      return ResponseEntity.badRequest().body(allRoles);
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
  public ResponseEntity<List<RoleOutput>> deleteMultipleRole(List<Long> ids) {
    try {
      roleDao.deleteMultipleRole(ids);
      allRoles = getAllRole();
      return ResponseEntity.ok(allRoles);
    } catch (Exception e) {
      allRoles = new ArrayList<RoleOutput>();
      return ResponseEntity.badRequest().body(allRoles);
    }
  }

  @Override
  public String restoreMultipleRole(List<Long> ids) {
    try {
      roleDao.restoreMultipleRole(ids);
      return "Roles Restored Successfully.";
    } catch (Exception e) {
      return e.getMessage();
    }
  }
}
