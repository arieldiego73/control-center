package com.controlcenter.controlcenter.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserInput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserRoles;
import com.controlcenter.controlcenter.model.UserTable;

@Mapper
public interface UserDao {
  List<UserTable> userTable();

  List<UserOutput> getAllUser();

  UserInfoOutput getUserById(String id);

  //get multiple user using request paran
  List<UserInfoOutput> getMultipleUserById(String id);
  
  void insertUser(UserInput user);
  void editUser(HashMap<String, Object> paramMap);
  // void insertUserBatch(List<User> users);

  //setting the del_flag of user to 1
  void logicalDeleteUser(String id);
  
  //setting the del_flag of user to 0
  void restoreUser(String id); 

  UserOutput getUserByUsername(UserOutput username);
  UserOutput getUsername(String username);

  //get all roles of a user
  List<UserRoles> getAllRolesOfUser(String emp_id);

  //Login session
  UserOutput getByUsername(String username);

  //batch delete
   void deleteMultipleUser(@Param("ids") List<String> ids);

   List<UserInfoOutput> getAllPossibleManager();

   void changePassword(String user_id, String new_password);

   void updateUserPicture(UserInfoOutput userOutput);

   UserInfoOutput principalInfo(String emp_id);
  
}
