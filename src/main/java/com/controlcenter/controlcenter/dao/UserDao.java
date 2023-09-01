package com.controlcenter.controlcenter.dao;

import java.util.List;


import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.UserInput;
import com.controlcenter.controlcenter.model.UserOutput;

@Mapper
public interface UserDao {
  List<UserOutput> findAll();
  UserInput getUserById(Long id);
  void insertUser(UserInput user);
  // void insertUserBatch(List<User> users);
  UserInput getUserByUsername(UserInput user);
}
