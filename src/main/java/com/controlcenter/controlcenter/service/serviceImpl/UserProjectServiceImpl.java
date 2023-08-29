package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.UserProjectDao;
import com.controlcenter.controlcenter.model.UserProject;
import com.controlcenter.controlcenter.service.UserProjectService;


@Service
public class UserProjectServiceImpl implements UserProjectService {
    
    @Autowired
    public UserProjectDao userProjectDao;

    @Override
    public List<UserProject> getAllUserProject(){
        return userProjectDao.getAllUserProject();
    }
    
    @Override
    public String addUserProject(UserProject userProject) {
        try {
            userProjectDao.addUserProject(userProject);
            return "UserProject Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editUserProjectInfo(String id, UserProject userProject) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("userProject", userProject);

            userProjectDao.editUserProjectInfo(paramMap);

            return "User Project Info Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteUserProject(String id) {
        try {
        
            userProjectDao.logicalDeleteUserProject(id);

            return "UserProject Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}