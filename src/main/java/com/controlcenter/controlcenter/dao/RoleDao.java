package com.controlcenter.controlcenter.dao;

import com.controlcenter.controlcenter.model.RoleOutput;
import com.controlcenter.controlcenter.model.RoleInput;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RoleDao {
  List<RoleOutput> getAllRole();
  RoleOutput getRoleById(String id);
  void addRole(RoleInput roleInput);
  void editRoleInfo(Map<String, Object> paramMap);
  void logicalDeleteRole(String id);
  void restoreRole(String id);
  void deleteMultipleRole(@Param("ids") List<Long> ids);
  void restoreMultipleRole(@Param("ids") List<Long> ids);
}
