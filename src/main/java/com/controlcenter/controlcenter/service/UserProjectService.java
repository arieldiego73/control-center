package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.controlcenter.controlcenter.model.UserProjectInput;
import com.controlcenter.controlcenter.model.UserProjectOutput;

public interface UserProjectService {
    public ResponseEntity<List<UserProjectOutput>> getAllUserProject();
    public String addUserProject(UserProjectInput userProject);
    public ResponseEntity<List<UserProjectOutput>> editUserProjectInfo(String id, UserProjectInput userProject);
    public String logicalDeleteUserProject(String id);
    public String restoreUserProject(String id);
}

