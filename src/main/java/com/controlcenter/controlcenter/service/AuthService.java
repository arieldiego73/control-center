package com.controlcenter.controlcenter.service;


import com.controlcenter.controlcenter.model.UserOutput;

public interface AuthService {
    //authentication service
    UserOutput authUser(String username, String password); 
}