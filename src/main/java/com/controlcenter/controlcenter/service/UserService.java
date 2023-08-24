package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.User;

public interface UserService {
  public List<User> findAll();

  public User getUserById(Long id);

  public String insertUser(User user);

  // public String insertUserBatch(List<User> users);
  public User getUserByUsername(User user);
}
