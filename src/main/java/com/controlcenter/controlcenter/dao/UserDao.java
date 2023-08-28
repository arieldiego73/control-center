package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.Account;
import com.controlcenter.controlcenter.model.User;

@Mapper
public interface UserDao {
  List<User> findAll();
  User getUserById(Long id);
  void insertUser(User user);
  // void insertUserBatch(List<User> users);
  User getUserByUsername(User user);

  void addAccount(Map<String, Object> paramMap);
}
