package com.controlcenter.controlcenter.dao;

import com.controlcenter.controlcenter.model.User;
import java.util.List;

public interface UserDAO {
  List<User> findAll();
  User getUserById(Long id);
  void insertUser(User user);
  void insertUserBatch(List<User> users);
  User getUserByUsername(User user);
}
