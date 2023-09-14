package com.controlcenter.controlcenter.service.serviceImpl;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.RoleDao;
import com.controlcenter.controlcenter.model.RoleOutput;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.RoleInput;
import com.controlcenter.controlcenter.service.RoleService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

  @Autowired
  public RoleDao roleDao;

  @Autowired
  public TimeFormatter timeFormatter;

  @Autowired
  public ActivityLogDao activityLogDao;

  public List<RoleOutput> roleList = new ArrayList<>();

  @Override
  public List<RoleOutput> getAllRole() {
    return roleDao.getAllRole();
  }

  @Override
  public RoleOutput getRoleById(String id) {
    return roleDao.getRoleById(id);
  }

  @Override
  public String addRole(RoleInput role) {

    try {
      roleDao.addRole(role);
      // Activitylog
      ActivityLogInput activityLogInput = new ActivityLogInput();

      activityLogInput.setEmp_id("101"); // current logged user dapat
      activityLogInput.setLog_desc("Added a role.");

      Long currentTimeMillis = System.currentTimeMillis();
      // Add the activity log
      activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
      activityLogDao.addActivityLog(activityLogInput);

      return "Role Added Successfully";

    } catch (Exception e) {
      return e.getMessage();
    }
  }
  // try {
  // roleDao.addRole(role);
  // allRoles = getAllRole();
  // return ResponseEntity.ok(allRoles);
  // } catch (Exception e) {
  // allRoles = new ArrayList<Role>();
  // return ResponseEntity.badRequest().body(allRoles);
  // }

  @Override
  public String editRoleInfo(String id, RoleInput role) {
    RoleOutput data = roleDao.getRoleById(id);

    if (data != null) {
      if (data.getDel_flag() == 1) {
        return "Role with the ID " + id + " has already been deleted.";
      } else {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("id", id);
        paramMap.put("role", role);

        roleDao.editRoleInfo(paramMap);

        // Activitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id("101"); // current logged user dapat
        activityLogInput.setLog_desc("Added a department.");

        Long currentTimeMillis = System.currentTimeMillis();
        // add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Role Edited Successfully";
      }
    } else {
      return "Role with the ID " + id + " cannot be found.";
    }
  }
  // try {
  // Map<String, Object> paramMap = new HashMap<>();
  // paramMap.put("id", id);
  // paramMap.put("role", role);

  // roleDao.editRoleInfo(paramMap);
  // allRoles = getAllRole();
  // return ResponseEntity.ok(allRoles);
  // } catch (Exception e) {
  // allRoles = new ArrayList<Role>();
  // return ResponseEntity.badRequest().body(allRoles);
  // }

  @Override
  public String logicalDeleteRole(String id) {
    RoleOutput data = roleDao.getRoleById(id);

    if (data != null) {
      if (data.getDel_flag() == 1) {
        return "Role with the ID " + id + " has already been deleted.";
      } else {
        roleDao.logicalDeleteRole(id);
        roleList = roleDao.getAllRole();

        // Activitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id("101"); // current logged user dapat
        activityLogInput.setLog_desc("Deleted a Role.");

        Long currentTimeMillis = System.currentTimeMillis();
        // Add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Role Deleted Successfully.";
      }
    } else {
      return "Role with the ID " + id + " cannot be found.";
    }
  }

  @Override
  public String restoreRole(String id) {
    RoleOutput data = roleDao.getRoleById(id);

    if (data != null) {
      if (data.getDel_flag() == 0) {
        return "Role with the ID " + id + " is not yet deleted.";
      } else {
        roleDao.restoreRole(id);

        // Activitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id("101"); // current logged user dapat
        activityLogInput.setLog_desc("Restored a role.");

        Long currentTimeMillis = System.currentTimeMillis();
        // Add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Role restored successfully.";
      }
    } else {
      return "Role with the ID " + id + " cannot be found.";
    }
  }

  @Override
  public String deleteMultipleRole(List<Long> ids) {
    roleList = roleDao.getAllRole();

    for (Long id : ids) {
      String toString = String.valueOf(id);
      RoleOutput role = roleDao.getRoleById(toString);
      if (role != null) {
        if (role.getDel_flag() == 1) {
          return "Role with the ID " + id + " is already deleted.";
        }
      } else {
        return "Role with the ID " + id + " cannot be found.";
      }
    }
    roleDao.deleteMultipleRole(ids);

    // Acivitylog
    ActivityLogInput activityLogInput = new ActivityLogInput();

    activityLogInput.setEmp_id("101"); // current logged user dapat
    activityLogInput.setLog_desc("Deleted Multiple roles.");

    Long currentTimeMillis = System.currentTimeMillis();
    // add the activity log
    activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
    activityLogDao.addActivityLog(activityLogInput);

    return "Records are successfully deleted.";
  }

  @Override
  public String restoreMultipleRole(List<Long> ids) {
    try {
      roleDao.restoreMultipleRole(ids);

      // Activitylog
      ActivityLogInput activityLogInput = new ActivityLogInput();

      activityLogInput.setEmp_id("101"); // current logged user dapat
      activityLogInput.setLog_desc("restored a multiple role.");

      Long currentTimeMillis = System.currentTimeMillis();
      // Add the activity log
      activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
      activityLogDao.addActivityLog(activityLogInput);

      return "Roles Restored Successfully.";
    } catch (Exception e) {
      return e.getMessage();
    }
  }
}
