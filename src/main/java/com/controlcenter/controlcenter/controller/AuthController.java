package com.controlcenter.controlcenter.controller;

import javax.servlet.http.HttpSession;

import java.util.HashMap; 
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.service.serviceImpl.AuthServiceImpl;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthServiceImpl authServiceImpl;

    //Login session
    @PostMapping("/login")
    public Map<String, String> authUser(@RequestBody UserOutput userOutput, HttpSession http){
        Map<String, String> response = new HashMap<>();
        String username = userOutput.getUsername();
        String password = userOutput.getPassword();

        UserOutput authUser = authServiceImpl.authUser(username, password);

        if (authUser != null) {
            http.setAttribute("session", authUser.getEmp_id());
            response.put("Status", "success");
            
            // Set a flag in the session to indicate that the user is authenticated
            http.setAttribute("isAuthenticated", true);
            
        } else {
            response.put("Status", "error");
            http.setAttribute("isAuthenticated", false); // Set isAuthenticated to false if authentication fails
        }
        return response;
    }

    // Logout remove httpsession
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        if (session != null) {
        session.invalidate();
        }
        return "{\"status\":\"success\"}";
    }


    //Checker session
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



    
}
