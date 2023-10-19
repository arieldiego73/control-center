package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.UserDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.AuthResponse;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.service.AuthService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserDao userDao;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // Authentication for username and password
    @Override
    public ResponseEntity<AuthResponse> authUser(String username, String password) {
        UserOutput user = userDao.getByUsername(username);
        String hashedPassword = user.getPassword();
        AuthResponse response = new AuthResponse();

        if (!bCryptPasswordEncoder.matches(password, hashedPassword)) {
            response.setErrorMessage("Incorrect password.");
            return ResponseEntity.status(400).body(response);
        }

        // if (user != null && password.equals(user.getPassword())) {

        if (user != null && bCryptPasswordEncoder.matches(password, hashedPassword)) {

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); // current logged user dapat
            activityLogInput.setLog_desc("Has signed in.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            response.setUserOutput(user);

            return ResponseEntity.ok(response);
        } else {
            response.setErrorMessage("Account not found!");
            return ResponseEntity.status(400).body(response);
        }
    }

    @Override
    public Map<String, String> logout(String emp_id) {
        Map<String, String> response = new HashMap<>();

        response.put("status", "logout success");

        // Activitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id(emp_id); // current logged user dapat
        activityLogInput.setLog_desc("Has signed out.");

        Long currentTimeMillis = System.currentTimeMillis();
        // add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return response;
    }

    @Override
    public ResponseEntity<AuthResponse> principalInfo(String emp_id) {
        UserInfoOutput principal = userDao.principalInfo(emp_id);
        AuthResponse response = new AuthResponse();
        
        if(principal != null) {
            response.setUserInfoOutput(principal);
            return ResponseEntity.ok(response);
        } else {
            response.setErrorMessage("Principal not found.");
            return ResponseEntity.status(500).body(response);
        }
    }
}
