package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ProjMemberDao;
import com.controlcenter.controlcenter.model.ProjMember;
import com.controlcenter.controlcenter.service.ProjMemberService;


@Service
public class ProjMemberServiceImpl implements ProjMemberService{
    
    @Autowired
    public ProjMemberDao projmemberDao;

    @Override
    public List<ProjMember> getAllProjMember(){
        return projmemberDao.getAllProjMember();
    }
    
    @Override
    public String addProjMember(ProjMember projmember) {
        try {
            projmemberDao.addProjMember(projmember);
            return "ProjMember Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editProjMemberInfo(String id, ProjMember projmember) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("projmember", projmember);

            projmemberDao.editProjMemberInfo(paramMap);

            return "ProjMember Info Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteProjMember(String id) {
        try {
        
            projmemberDao.logicalDeleteProjMember(id);

            return "ProjMemberDao Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
