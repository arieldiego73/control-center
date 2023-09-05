package com.controlcenter.controlcenter.service;

import com.controlcenter.controlcenter.model.Account;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserInput;
import com.controlcenter.controlcenter.model.UserOutput;

import java.util.List;

public interface UserService {
  public List<UserOutput> findAll();

  public UserInfoOutput getUserById(Long id);

  public String insertUser(UserInput user);

  public UserOutput getUserByUsername(UserOutput username);

  public UserOutput getUsername(String username);

  public String addAccount(Account account);

  // public UserOutput getLoggedInUser(UserOutput user);
}
