package com.controlcenter.controlcenter.service;

import com.controlcenter.controlcenter.model.Role;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

public interface RoleService {
  public List<Role> getAllRole();

  public ResponseEntity<List<Role>> addRole(Role role);

  public ResponseEntity<List<Role>> editRoleInfo(String id, Role role);

  public ResponseEntity<List<Role>> logicalDeleteRole(String id);

  public String restoreRole(String id);

  public ResponseEntity<List<Role>> deleteMultipleRole(
    @RequestParam List<Long> ids
  );

  public String restoreMultipleRole(@RequestParam List<Long> ids);
}
