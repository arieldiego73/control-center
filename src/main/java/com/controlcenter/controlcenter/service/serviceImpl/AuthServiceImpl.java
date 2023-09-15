package com.controlcenter.controlcenter.service.serviceImpl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.UserDao;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.service.AuthService;

@Service
@Transactional
public class AuthServiceImpl implements AuthService{

    @Autowired
    private UserDao userDao;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //Authentication for username and password
    @Override
    public UserOutput authUser(String username, String password){
        UserOutput user = userDao.getByUsername(username);
        String hashedPassword = user.getPassword();

        if (user != null && bCryptPasswordEncoder.matches(password, hashedPassword)){
            return user;
        } else {
            return null;
        }
    }
    
}
