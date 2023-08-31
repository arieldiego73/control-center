package com.controlcenter.controlcenter.service;

import com.controlcenter.controlcenter.model.Account;
import com.controlcenter.controlcenter.model.UserInput;
import com.controlcenter.controlcenter.model.UserOutput;

import java.util.List;

public interface UserService {
  public List<UserOutput> findAll();

  public UserInput getUserById(Long id);

  public String insertUser(UserInput user);

  // public String insertUserBatch(List<User> users);
  public UserInput getUserByUsername(UserInput user);

  public String addAccount(Account account);
}
