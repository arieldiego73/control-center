package com.controlcenter.controlcenter.service;

import com.controlcenter.controlcenter.model.AccountInput;
import com.controlcenter.controlcenter.model.AccountOutput;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserInput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserRoles;
import com.controlcenter.controlcenter.model.UserTable;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface UserService {
  public ResponseEntity<List<UserTable>> findAll();

  public ResponseEntity<UserInfoOutput> getUserById(String id);
  
  public String editUser(String id, UserInput user);

  // public String insertUser(UserInput user);

  // public UserOutput getUserByUsername(UserOutput username);

  public ResponseEntity<UserOutput> getUsername(String username);

  public String addAccount(AccountInput account, List<Long> role_ids);

  public String editAccount(String id, AccountOutput accountBody, List<Long> role_ids);

  public String getLoggedInUser(UserOutput user);

  //get all user roles
  public ResponseEntity<List<Map<Long, Object>>> getAllRolesOfUser(String emp_id);
}
