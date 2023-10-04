package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.controlcenter.controlcenter.model.UserProjectInput;
import com.controlcenter.controlcenter.model.UserProjectOutput;

public interface UserProjectService {
    public ResponseEntity<List<UserProjectOutput>> getAllUserProject();

    public UserProjectOutput getUserProjectById(String id);

    public String addUserProject(UserProjectInput userProject, String emp_id);

    public String editUserProjectInfo(String id, UserProjectInput userProject, String emp_id);

    public String logicalDeleteUserProject(String id, String emp_id);

    public String restoreUserProject(String id);

    public String deleteMultipleUserProject(List<Long> ids, String emp_id);
}
