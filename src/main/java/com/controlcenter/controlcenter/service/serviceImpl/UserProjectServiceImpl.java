package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.UserProjectDao;
import com.controlcenter.controlcenter.model.UserProjectInput;
import com.controlcenter.controlcenter.model.UserProjectOutput;
import com.controlcenter.controlcenter.service.UserProjectService;


@Service
public class UserProjectServiceImpl implements UserProjectService {
    
    @Autowired
    public UserProjectDao userProjectDao;

    @Override
    public ResponseEntity<List<UserProjectOutput>> getAllUserProject(){
        try {
            List<UserProjectOutput> userProjects = userProjectDao.getAllUserProject();
            return ResponseEntity.ok(userProjects);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @Override
    public String addUserProject(UserProjectInput userProject) {
        try {
            userProjectDao.addUserProject(userProject);
            return "User Project added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public ResponseEntity<List<UserProjectOutput>> editUserProjectInfo(String id, UserProjectInput userProject) {
        try {
            List<UserProjectOutput> userProjects = userProjectDao.getAllUserProject(); 
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("userProject", userProject);

            userProjectDao.editUserProjectInfo(paramMap);

            return ResponseEntity.ok(userProjects);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @Override
    public String logicalDeleteUserProject(String id) {
        try {
        
            userProjectDao.logicalDeleteUserProject(id);

            return "UserProject deleted successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreUserProject(String id) {
        try {
        
            userProjectDao.restoreUserProject(id);

            return "UserProject restored successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}