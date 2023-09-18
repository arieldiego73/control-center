package com.controlcenter.controlcenter.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.controlcenter.controlcenter.model.MultiRoleOutput;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserInput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserRoles;
import com.controlcenter.controlcenter.model.UserTable;

@Mapper
public interface UserDao {
  List<UserTable> findAll();
  UserInfoOutput getUserById(String id);
  void insertUser(UserInput user);
  void editUser(HashMap<String, Object> paramMap);
  // void insertUserBatch(List<User> users);
  UserOutput getUserByUsername(UserOutput username);
  UserOutput getUsername(String username);

  //get all roles of a user
  List<UserRoles> getAllRolesOfUser(String emp_id);

  //Login session
  UserOutput getByUsername(String username);
  
}
