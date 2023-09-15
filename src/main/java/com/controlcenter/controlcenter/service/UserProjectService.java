package com.controlcenter.controlcenter.service;

import java.util.List;


import com.controlcenter.controlcenter.model.UserProjectInput;
import com.controlcenter.controlcenter.model.UserProjectOutput;

public interface UserProjectService {
    public List<UserProjectOutput> getAllUserProject();

    public UserProjectOutput getUserProjectById(String id);

    public String addUserProject(UserProjectInput userProject);

    public String editUserProjectInfo(String id, UserProjectInput userProject);

    public String logicalDeleteUserProject(String id);

    public String restoreUserProject(String id);
}
