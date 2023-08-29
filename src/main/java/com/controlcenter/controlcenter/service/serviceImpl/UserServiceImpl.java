package com.controlcenter.controlcenter.service.serviceImpl;

import com.controlcenter.controlcenter.dao.PersonalInfoDao;
import com.controlcenter.controlcenter.dao.UserDao;
import com.controlcenter.controlcenter.model.Account;
import com.controlcenter.controlcenter.model.PersonalInfo;
import com.controlcenter.controlcenter.model.User;
import com.controlcenter.controlcenter.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  public UserDao userDao;

  @Autowired 
  public PersonalInfoDao personalInfoDao;

  @Override
  public List<User> findAll() {
    return userDao.findAll();
  }

  @Override
  public User getUserById(Long id) {
    return userDao.getUserById(id);
  }

  @Override
  public String insertUser(User user) {
    try {
      userDao.insertUser(user);
      return "ok";
    } catch (Exception e) {
      return e.getMessage();
    }
  }

  @Override
  public String addAccount(Account account) {
    User user = new User();
    PersonalInfo personalInfo = new PersonalInfo();

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
    user.setReg_id(account.getReg_id());
    user.setUpdate_id(account.getUpdate_id());

    //initializing the value of personal info.
    personalInfo.setEmp_id(account.getEmp_id());
    personalInfo.setFname(account.getFname());
    personalInfo.setLname(account.getLname());
    personalInfo.setMname(account.getMname());
    personalInfo.setEmail(account.getEmail());
    personalInfo.setReg_id(account.getReg_id());
    personalInfo.setUpdate_id(account.getUpdate_id());

    try {
      userDao.insertUser(user);
      personalInfoDao.addPersonalInfo(personalInfo);
      return "Account Created Successfully.";
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

  @Override
  public User getUserByUsername(User user) {
    return userDao.getUserByUsername(user);
  }
}
