package com.controlcenter.controlcenter.service;

import com.controlcenter.controlcenter.model.AccountInput;
import com.controlcenter.controlcenter.model.AccountOutput;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserInput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserTable;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface UserService {
  public ResponseEntity<List<UserTable>> userTable();

  public ResponseEntity<List<UserOutput>> getAllUser();

  public ResponseEntity<UserInfoOutput> getUserById(String id);

  public ResponseEntity<List<UserInfoOutput>> getMultipleUserById(List<String> emp_id);
  
  public String editUser(String id, UserInput user);

  //setting the del_flag of user to 1
  public ResponseEntity<String> logicalDeleteUser(String id, String emp_id);

  //setting the del_flag of user to 0
  public ResponseEntity<String> restoreUser(String id);

  // public String insertUser(UserInput user);

  // public UserOutput getUserByUsername(UserOutput username);

  public UserOutput getUsername(String username);

  public ResponseEntity<String> addAccount(AccountInput account, List<Long> role_ids, String emp_id);

  public ResponseEntity<String> editAccount(String id, AccountOutput accountBody, List<Long> role_ids, String emp_id);

  public String getLoggedInUser(UserOutput user);

  //get all user roles
  public ResponseEntity<List<Map<Long, Object>>> getAllRolesOfUser(String emp_id);

  //batch delete
  public String deleteMultipleUser(List<String> ids, String emp_id);

  public ResponseEntity<List<UserInfoOutput>> getAllPossibleManager();
}
