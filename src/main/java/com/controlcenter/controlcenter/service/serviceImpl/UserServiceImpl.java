package com.controlcenter.controlcenter.service.serviceImpl;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.PersonalInfoDao;
import com.controlcenter.controlcenter.dao.UserDao;
import com.controlcenter.controlcenter.model.Account;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.PersonalInfoInput;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserInput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserTable;
import com.controlcenter.controlcenter.service.UserService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

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
  public String addAccount(Account account) {
    UserInput user = new UserInput();
    PersonalInfoInput personalInfo = new PersonalInfoInput();

    account.setPassword(passEnc.encode(account.getPassword()));

    //initializing the value of user.
    user.setEmp_id(account.getEmp_id());
    user.setUsername(account.getUsername());
    user.setPassword(account.getPassword());
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

      return "Account Created Successfully";
    } catch (Exception e) {
      return e.getMessage();
    }
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
