package com.controlcenter.controlcenter.mapper;

import com.controlcenter.controlcenter.model.User;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
  List<User> findAll();
  User getUserById(Long id);
  void insertUser(User user);
  void insertUserBatch(List<User> users);
}
