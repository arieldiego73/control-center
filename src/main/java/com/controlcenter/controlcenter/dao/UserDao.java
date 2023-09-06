package com.controlcenter.controlcenter.dao;

import java.util.List;


import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserInput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserTable;

@Mapper
public interface UserDao {
  List<UserTable> findAll();
  UserInfoOutput getUserById(String id);
  void insertUser(UserInput user);
  // void insertUserBatch(List<User> users);
  UserOutput getUserByUsername(UserOutput username);
  UserOutput getUsername(String username);
  
}
