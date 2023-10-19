package com.controlcenter.controlcenter.service;

import com.controlcenter.controlcenter.model.AccountInput;
import com.controlcenter.controlcenter.model.AccountOutput;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserInput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserTable;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

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

  public UserOutput getUsername(String username);

  public ResponseEntity<String> addAccount(AccountInput account, List<Long> role_ids, String emp_id, @RequestParam(value = "photo",required = false) MultipartFile photo);

  public ResponseEntity<String> editAccount(String id, AccountOutput accountBody, List<Long> role_ids, String emp_id, @RequestParam(value = "photo",required = false) MultipartFile photo, HttpSession httpSession);

  public String getLoggedInUser(UserOutput user);

  //get all user roles
  public ResponseEntity<List<Map<Long, Object>>> getAllRolesOfUser(String emp_id);

  //batch delete
  public String deleteMultipleUser(List<String> ids, String emp_id);

  public ResponseEntity<List<UserInfoOutput>> getAllPossibleManager();

  //change the password of a user
  public ResponseEntity<String> changePassword(String user_id, String admin_password, String new_password, String confirm_new_password, String principal_id);
}
