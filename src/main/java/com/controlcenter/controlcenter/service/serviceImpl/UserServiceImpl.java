package com.controlcenter.controlcenter.service.serviceImpl;

import com.controlcenter.controlcenter.dao.UserDao;
import com.controlcenter.controlcenter.model.Account;
import com.controlcenter.controlcenter.model.User;
import com.controlcenter.controlcenter.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  public UserDao userDao;

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
  public String addAccount(String id, Account account) {
    try {
      Map<String, Object> paramMap = new HashMap<>();

      paramMap.put("id", id);
      paramMap.put("account", account);

      userDao.addAccount(paramMap);

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
