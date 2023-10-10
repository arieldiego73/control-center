package com.controlcenter.controlcenter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.controlcenter.controlcenter.service.ProfileService;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    
    @Autowired
    ProfileService profileService;

    @PutMapping("/update-picture/{emp_id}")
    public ResponseEntity<String> updateUserPicture(@PathVariable("emp_id") String emp_id, @RequestParam("photo") MultipartFile photo) {
        try {
            profileService.updateUserPicture(emp_id, photo);
            return ResponseEntity.ok("User picture uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload user picture");
        }
    }

    @GetMapping("/user-picture/{emp_id}")
    public ResponseEntity<FileSystemResource> getUserPicture(@PathVariable("photo") String emp_id) {
        return profileService.getUserPicture(emp_id);
        
    }


}
