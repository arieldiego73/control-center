package com.controlcenter.controlcenter.service;


import java.util.Map;

import com.controlcenter.controlcenter.model.UserOutput;

public interface AuthService {
    //authentication service
    public UserOutput authUser(String username, String password); 
    public Map<String, String> logout(String emp_id);
}