package com.controlcenter.controlcenter.service;

import com.controlcenter.controlcenter.model.RoleOutput;
import com.controlcenter.controlcenter.model.RoleInput;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

public interface RoleService {
  public List<RoleOutput> getAllRole();

  public RoleOutput getRoleById(String id);

  public String addRole(RoleInput role);

  public String editRoleInfo(String id, RoleInput role);

  public String logicalDeleteRole(String id);

  public String restoreRole(String id);

  public String deleteMultipleRole(
    @RequestParam List<Long> ids
  );

  public String restoreMultipleRole(@RequestParam List<Long> ids);
}
