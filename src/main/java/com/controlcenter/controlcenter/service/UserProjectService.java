package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.UserProject;

public interface UserProjectService {
    public List<UserProject> getAllUserProject();
    public String addUserProject(UserProject userProject);
    public String editUserProjectInfo(String id, UserProject userProject);
    public String logicalDeleteUserProject(String id);

    
}

