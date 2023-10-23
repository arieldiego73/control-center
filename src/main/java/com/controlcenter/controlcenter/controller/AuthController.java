package com.controlcenter.controlcenter.controller;

import javax.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.dao.UserDao;
import com.controlcenter.controlcenter.model.AuthResponse;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.service.AuthService;
import com.controlcenter.controlcenter.service.serviceImpl.AuthServiceImpl;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthServiceImpl authServiceImpl;

    @Autowired 
    private UserDao userDao;

    @Autowired
    private AuthService authService;

    // Login session
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authUser(@RequestBody UserOutput userOutput, HttpSession http, HttpServletResponse response) {
        Map<String, String> authResponse = new HashMap<>();
        Map<String, String> errorMessage = new HashMap<>();
        String username = userOutput.getUsername();
        String password = userOutput.getPassword();

        UserOutput user = userDao.getByUsername(username);

        if(userOutput.getUsername().equals("") && userOutput.getPassword().equals("")) {
            errorMessage.put("error", "Please enter a username and password.");
            return ResponseEntity.status(400).body(errorMessage);
        }

        if (userOutput.getUsername().equals("")) {
            errorMessage.put("error", "Please enter a valid username.");
            return ResponseEntity.status(400).body(errorMessage);
        }

        if(userOutput.getPassword().equals("")) {
            errorMessage.put("error", "Please enter your password.");
            return ResponseEntity.status(400).body(errorMessage);
        }

        if(user == null) {
            errorMessage.put("error", "Account does not exist.");
            return ResponseEntity.status(400).body(errorMessage);
        }

        ResponseEntity<AuthResponse> authUser = authServiceImpl.authUser(username, password);

        if(authUser.getStatusCode().value() > 200) {

            errorMessage.put("error", authUser.getBody().getErrorMessage());
            return ResponseEntity.status(400).body(errorMessage);
        }
        if (authUser != null) {
            http.setAttribute("session", authUser.getBody().getUserOutput().getEmp_id());
            http.setAttribute("isAuthenticated", true);

            // // Set a cookie for session-based authentication
            Cookie authCookie = new Cookie("sessionID", "CookieCutie");
            authCookie.setPath("/"); // Set the path to '/' to make the cookie available site-wide
            authCookie.setMaxAge(86400); // Set the cookie to expire after 1 day (86,400 seconds)
            authCookie.setHttpOnly(true);
            authCookie.setSecure(true);
            response.addCookie(authCookie);

            UserInfoOutput currentLoggedUser = userDao.getUserById(authUser.getBody().getUserOutput().getEmp_id());

            authResponse.put("status", "active");
            authResponse.put("username", currentLoggedUser.getUsername());
            authResponse.put("id", currentLoggedUser.getEmp_id());
            authResponse.put("fullName", currentLoggedUser.getFname() + " " + currentLoggedUser.getLname());
            authResponse.put("email", currentLoggedUser.getEmail());
            authResponse.put("img", currentLoggedUser.getImg_src());
            

            
            return ResponseEntity.ok(authResponse);
        } else {
            authResponse.put("status", "error");
            http.setAttribute("isAuthenticated", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authResponse);
        }
    }

    // Logout remove httpsession
    @GetMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession session) {
        String emp_id = session.getAttribute("session").toString();
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok(authServiceImpl.logout(emp_id));
    }

    // Checker session
    @GetMapping("/check")
    public ResponseEntity<Map<String, Object>> checkSession(HttpSession httpSession) {
        Map<String, Object> response = new HashMap<>();
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated) {
            response.put("status", "active");
        } else {
            response.put("status", "inactive");
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/principal")
    public ResponseEntity<AuthResponse> principalInfo(HttpSession httpSession) {
        AuthResponse response = new AuthResponse();
        String emp_id = httpSession.getAttribute("session").toString();
        try {
            return authService.principalInfo(emp_id);
        } catch (Exception e) {
            response.setErrorMessage(e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

}
