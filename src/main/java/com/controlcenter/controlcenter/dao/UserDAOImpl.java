package com.controlcenter.controlcenter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.User;

// @RestController
// @RequestMapping("/api")
@Repository
public class UserDAOImpl implements UserDAO {
    private final UserMapper userMapper;

    @Autowired
    public UserDAOImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    // @Override
    // public YourEntity findById(Long id) {
    //     return yourEntityMapper.findById(id);
    // }

    @Override
    // @GetMapping("/all")
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
