package com.controlcenter.controlcenter.service;

import com.controlcenter.controlcenter.model.RoleOutput;
import com.controlcenter.controlcenter.model.RoleInput;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

public interface RoleService {
  public List<RoleOutput> getAllRole();

  public String addRole(RoleInput role);

  public String editRoleInfo(String id, RoleInput role);

  public ResponseEntity<List<RoleOutput>> logicalDeleteRole(String id);

  public String restoreRole(String id);

  public ResponseEntity<List<RoleOutput>> deleteMultipleRole(
    @RequestParam List<Long> ids
  );

  public String restoreMultipleRole(@RequestParam List<Long> ids);
}
