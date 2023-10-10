package com.controlcenter.controlcenter.service;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.controlcenter.controlcenter.model.UserOutput;

public interface ProfileService {

    public UserOutput getUserById(String emp_id);

    public ResponseEntity<FileSystemResource> getUserPicture(String emp_id);

    public ResponseEntity<String> updateUserPicture(@PathVariable("emp_id") String emp_id, @RequestParam("photo") MultipartFile photo);
}
