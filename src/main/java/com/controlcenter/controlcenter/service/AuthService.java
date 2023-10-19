package com.controlcenter.controlcenter.service;


import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.controlcenter.controlcenter.model.AuthResponse;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserOutput;

public interface AuthService {
    //authentication service
    public ResponseEntity<AuthResponse> authUser(String username, String password); 
    public Map<String, String> logout(String emp_id);
    public ResponseEntity<AuthResponse> principalInfo(String emp_id);
}