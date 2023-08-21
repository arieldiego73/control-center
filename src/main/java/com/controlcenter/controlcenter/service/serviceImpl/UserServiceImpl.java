package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.UserDao;
import com.controlcenter.controlcenter.model.User;
import com.controlcenter.controlcenter.service.UserService;

@Service
public class UserServiceImpl implements UserService{

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
    public String insertUserBatch(List<User> users) {
        try {
            userDao.insertUserBatch(users);
            return "ok";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public User getUserByUsername(User user) {
        return userDao.getUserByUsername(user);
    }


}
