package com.controlcenter.controlcenter.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.User;

@Mapper
public interface UserDao {
  List<User> findAll();
  User getUserById(Long id);
  void insertUser(User user);
  // void insertUserBatch(List<User> users);
  User getUserByUsername(User user);
}
