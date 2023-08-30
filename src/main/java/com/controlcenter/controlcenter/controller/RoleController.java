package com.controlcenter.controlcenter.controller;

import com.controlcenter.controlcenter.model.Role;
import com.controlcenter.controlcenter.service.RoleService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/role")
public class RoleController {

  @Autowired
  public RoleService roleService;

  @GetMapping("/all")
  public List<Role> getAllRole() {
    return roleService.getAllRole();
  }

  @PostMapping("/add")
  public ResponseEntity<List<Role>> addRole(@RequestBody Role role) {
    String res = roleService.addRole(role);
    List<Role> allRoles = new ArrayList<Role>();
    if (res.equals("Role added successfully!")) {
      allRoles = getAllRole();
      return ResponseEntity.ok(allRoles);
    } else {
      return ResponseEntity.badRequest().body(allRoles);
    }
  }

  @PutMapping("/edit/{id}")
  public ResponseEntity<List<Role>> editRoleInfo(
    @PathVariable String id,
    @RequestBody Role role
  ) {
    String res = roleService.editRoleInfo(id, role);
    List<Role> allRoles = new ArrayList<Role>();
    if (res.equals("Role edited successfully!")) {
      allRoles = getAllRole();
      return ResponseEntity.ok(allRoles);
    } else {
      return ResponseEntity.badRequest().body(allRoles);
    }
  }

  @PutMapping("/delete/{id}")
  public ResponseEntity<List<Role>> logicalDeleteRole(@PathVariable String id) {
    String res = roleService.logicalDeleteRole(id);
    List<Role> allRoles = new ArrayList<Role>();
    if (res.equals("Role deleted successfully!")) {
      allRoles = getAllRole();
      return ResponseEntity.ok(allRoles);
    } else {
      return ResponseEntity.badRequest().body(allRoles);
    }
  }
}
