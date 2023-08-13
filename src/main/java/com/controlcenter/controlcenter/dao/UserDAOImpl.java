package com.controlcenter.controlcenter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.model.User;

@Service
public class UserDAOImpl implements UserDAO {
    private UserMapper userMapper;

    @Autowired
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

    // @Override
    // public void save(YourEntity entity) {
    //     yourEntityMapper.save(entity);
    // }

    // @Override
    // public void delete(YourEntity entity) {
    //     yourEntityMapper.delete(entity);
    // }
}
