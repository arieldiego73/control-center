package com.controlcenter.controlcenter.dao;

import java.util.List;

import com.controlcenter.controlcenter.model.User;

public interface UserDAO {
     List<User> findAll();
     User getUserById(Long id);
     void insertUser(User user);
     void insertUserBatch(List<User> users);
}
