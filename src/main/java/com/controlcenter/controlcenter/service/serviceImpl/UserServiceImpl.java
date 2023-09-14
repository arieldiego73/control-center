package com.controlcenter.controlcenter.service.serviceImpl;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.PersonalInfoDao;
import com.controlcenter.controlcenter.dao.UserDao;
import com.controlcenter.controlcenter.model.AccountInput;
import com.controlcenter.controlcenter.model.AccountOutput;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.PersonalInfoInput;
import com.controlcenter.controlcenter.model.PersonalInfoOutput;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserInput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserTable;
import com.controlcenter.controlcenter.service.UserService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

import java.util.HashMap;
// import java.util.Collections;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

  @Autowired
  public UserDao userDao;

  @Autowired
  public TimeFormatter timeFormatter;

  @Autowired 
  public ActivityLogDao activityLogDao;

  @Autowired 
  public PersonalInfoDao personalInfoDao;

  @Autowired 
  public PasswordEncoder passEnc;

  @Override
  public ResponseEntity<List<UserTable>> findAll() {
    try {
      List<UserTable> users = userDao.findAll();
      return ResponseEntity.ok(users);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @Override
  public ResponseEntity<UserInfoOutput> getUserById(String id) {
    try {
      UserInfoOutput user = userDao.getUserById(id);
      return ResponseEntity.ok(user);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @Override
  public String editUser(String id, UserInput user) {
    HashMap<String, Object> paramMap = new HashMap<>();

    paramMap.put("id", id);
    paramMap.put("user", user);

    userDao.editUser(paramMap);

    return "User Edited Successfully";
  }

  // @Override
  // public String insertUser(UserInput user) {
  //   UserInput userHashed = user;
  //   userHashed.setPassword(passEnc.encode(user.getPassword()));

  //   try {
  //     userDao.insertUser(userHashed);
  //     return "User created successfully";
  //   } catch (Exception e) {
  //     return e.getMessage();
  //   }
  // }

  @Override
  public String addAccount(AccountInput account) {

    UserInfoOutput userById = userDao.getUserById(account.getEmp_id());

    if(userById != null) {
      return "The Emplyee ID of " + account.getEmp_id() + " is already taken";
    } else {
      List<UserTable> users = userDao.findAll();

      for(UserTable perUser : users) {
        if(account.getUsername().equals(perUser.getUsername())) {
          return "The Username of " + account.getUsername() + " is already taken";
        } else if(account.getEmail().equals(perUser.getEmail())) {
          return "The Email of " + account.getEmail() + " is already taken";
        }
      }
  
      UserInput user = new UserInput();
      PersonalInfoInput personalInfo = new PersonalInfoInput();
      //initializing the value of user.
      user.setEmp_id(account.getEmp_id());
      user.setUsername(account.getUsername());
      user.setPassword(passEnc.encode(account.getPassword()));
      user.setPosition_id(account.getPosition_id());
      user.setDept_id(account.getDept_id());
      user.setSection_id(account.getSection_id());
      user.setStatus_code(account.getStatus_code());
      user.setRole_id(account.getRole_id());
      user.setImg_src(account.getImg_src());

      //initializing the value of personal info.
      personalInfo.setEmp_id(account.getEmp_id());
      personalInfo.setFname(account.getFname());
      personalInfo.setLname(account.getLname());
      personalInfo.setMname(account.getMname());
      personalInfo.setEmail(account.getEmail());

      try {
        userDao.insertUser(user);
        personalInfoDao.addPersonalInfo(personalInfo);

        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id("101"); //current logged user dapat
        activityLogInput.setLog_desc("Added a user.");

        Long currentTimeMillis = System.currentTimeMillis();
        //add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);
        } catch (Exception e) {
        return e.getMessage();
      }
      return "Account Created Successfully";
    }
  }

  @Override
  public String editAccount(String id, AccountOutput accountBody) {
    HashMap<String, Object> userMap = new HashMap<>();
    HashMap<String, Object> personalInfoMap = new HashMap<>();

    UserOutput user = new UserOutput();
    PersonalInfoOutput personalInfo = new PersonalInfoOutput();

    List<UserTable> accounts = userDao.findAll();

    // for(UserTable account : accounts) {
    //   if(id == accountBody.getEmp_id()) {
    //     if(accountBody.getDel_flag() == 1) {
    //       return "User with the Employee ID of " + id + " has already been deleted";
    //     } else if(accountBody.getUsername().equals(account.getUsername())) {
    //       return "The Username " + accountBody.getUsername() + " is already taken";
    //     } else if (accountBody.getEmail().equals(account.getEmail())) {
    //       return "The Email " + accountBody.getEmail() + " is already taken";
    //     }
    //   } else {
    //     return "User with Employee ID of " + id + " cannot be found";
    //   }
    // }

    user.setEmp_id(accountBody.getEmp_id());
    user.setUsername(accountBody.getUsername());
    user.setPassword(passEnc.encode(accountBody.getPassword()));
    user.setPosition_id(accountBody.getPosition_id());
    user.setDept_id(accountBody.getDept_id());
    user.setSection_id(accountBody.getSection_id());
    user.setStatus_code(accountBody.getStatus_code());
    user.setRole_id(accountBody.getRole_id());
    user.setImg_src(accountBody.getImg_src());

    personalInfo.setEmp_id(accountBody.getEmp_id());
    personalInfo.setFname(accountBody.getFname());
    personalInfo.setLname(accountBody.getLname());
    personalInfo.setMname(accountBody.getMname());
    personalInfo.setEmail(accountBody.getEmail());

    userMap.put("id", id);
    userMap.put("user", user);

    personalInfoMap.put("id", id);
    personalInfoMap.put("personalInfo", personalInfo);

    userDao.editUser(userMap);
    personalInfoDao.editPersonalInfo(personalInfoMap);

    return "Account Edited Successfully";
  }


  //   @Override
  //   public String insertUserBatch(List<User> users) {
  //     try {
  //       userDao.insertUserBatch(users);
  //       return "ok";
  //     } catch (Exception e) {
  //       return e.getMessage();
  //     }
  //   }

  // @Override
  // public UserOutput getUserByUsername(UserOutput username) {
  //   return userDao.getUserByUsername(username);
  // }

  @Override
  public ResponseEntity<UserOutput> getUsername(String username) {
    try {
      UserOutput user = userDao.getUsername(username);
      return ResponseEntity.ok(user);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // @Override
  // public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
  //   UserOutput user = userDao.getUsername(username);

  //   if(user == null) {
  //     throw new UsernameNotFoundException(username + "not found.");
  //   }
  //   return new User(
  //     user.getUsername(),
  //     user.getPassword(),
  //     Collections.emptyList()
  //   );
  // }

  @Override
  public String getLoggedInUser(UserOutput user) {

    UserOutput users = userDao.getUserByUsername(user);

    if(users != null) {
      boolean isMatched = passEnc.
      matches(
        user.getPassword(), 
        users.getPassword()
      );

      if(isMatched) {
        users.setEmp_id(users.getEmp_id());
        users.setUsername(users.getUsername());
        users.setPassword(users.getPassword());
        users.setPosition_id(users.getPosition_id());
        users.setDept_id(users.getDept_id());
        users.setSection_id(users.getSection_id());
        users.setStatus_code(users.getStatus_code());
        users.setRole_id(users.getRole_id());
        users.setImg_src(users.getImg_src());

        //Activitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Login successfully.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

        return "Login Successfully.";
      } else {

        //Activitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Login unsuccessfully.");

            Long currentTimeMillis = System.currentTimeMillis();
            //add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

        return "Login unsuccessfully.";
      }
    } else {
      return "Username and Password doesn't match.";
    }
    
  }
}
