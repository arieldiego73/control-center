package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.UserProject;

public interface UserProjectService {
    public List<UserProject> getAllUserProject();
    public String addUserProject(UserProject userproject);
    public String editUserProjectInfo(String id, UserProject userproject);
    public String logicalDeleteUserProject(String id);

    
}

