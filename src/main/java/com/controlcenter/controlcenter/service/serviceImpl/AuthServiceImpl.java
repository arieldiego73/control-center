package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.UserDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
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
    public UserOutput authUser(String username, String password) {
        UserOutput user = userDao.getByUsername(username);
        String hashedPassword = user.getPassword();

        if (user != null && bCryptPasswordEncoder.matches(password, hashedPassword)) {

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); // current logged user dapat
            activityLogInput.setLog_desc("Has signed in.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return user;
        } else {
            return null;
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

}
