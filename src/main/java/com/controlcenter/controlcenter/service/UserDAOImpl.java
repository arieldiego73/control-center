package com.controlcenter.controlcenter.service;

import com.controlcenter.controlcenter.dao.UserDAO;
import com.controlcenter.controlcenter.mapper.UserMapper;
import com.controlcenter.controlcenter.model.User;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class UserDAOImpl implements UserDAO {

  private UserMapper userMapper;

  public UserDAOImpl(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  // @Override
  // public YourEntity findById(Long id) {
  //     return yourEntityMapper.findById(id);
  // }

  @Override
  public List<User> findAll() {
    return userMapper.findAll();
  }

  @Override
  public User getUserById(Long id) {
    return userMapper.getUserById(id);
  }

  @Override
  public void insertUser(User user) {
    userMapper.insertUser(user);
  }

  @Override
  public void insertUserBatch(List<User> users) {
    userMapper.insertUserBatch(users);
  }

  @Override
  public User getUserByUsername(User user) {
    return userMapper.getUserByUsername(user);
  }
  // @Override
  // public void save(YourEntity entity) {
  //     yourEntityMapper.save(entity);
  // }

  // @Override
  // public void delete(YourEntity entity) {
  //     yourEntityMapper.delete(entity);
  // }
}
