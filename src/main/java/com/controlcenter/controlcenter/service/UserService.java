package com.controlcenter.controlcenter.service;

import com.controlcenter.controlcenter.model.Account;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserTable;

import java.util.List;

import org.springframework.http.ResponseEntity;

public interface UserService {
  public ResponseEntity<List<UserTable>> findAll();

  public ResponseEntity<UserInfoOutput> getUserById(String id);

  // public String insertUser(UserInput user);

  // public UserOutput getUserByUsername(UserOutput username);

  public ResponseEntity<UserOutput> getUsername(String username);

  public String addAccount(Account account);

  public String getLoggedInUser(UserOutput user);
}
