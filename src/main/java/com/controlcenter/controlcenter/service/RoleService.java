package com.controlcenter.controlcenter.service;

import com.controlcenter.controlcenter.model.RoleOutput;
import com.controlcenter.controlcenter.model.RoleInput;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

public interface RoleService {
  public ResponseEntity<List<RoleOutput>> getAllRole();

  public RoleOutput getRoleById(String id);

  public String addRole(RoleInput role, String emp_id);

  public ResponseEntity<String> editRoleInfo(String id, RoleInput role, String emp_id);

  public String logicalDeleteRole(String id, String emp_id);

  public String restoreRole(String id);

  public String deleteMultipleRole(@RequestParam List<Long> ids, String emp_id);

  public String restoreMultipleRole(@RequestParam List<Long> ids);
}
