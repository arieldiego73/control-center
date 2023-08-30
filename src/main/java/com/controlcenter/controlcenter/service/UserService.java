package com.controlcenter.controlcenter.service;

import com.controlcenter.controlcenter.model.Account;
import com.controlcenter.controlcenter.model.User;
import java.util.List;

public interface UserService {
  public List<User> findAll();

  public User getUserById(Long id);

  public String insertUser(User user);

  // public String insertUserBatch(List<User> users);
  public User getUserByUsername(User user);

  public String addAccount(Account account);
}
