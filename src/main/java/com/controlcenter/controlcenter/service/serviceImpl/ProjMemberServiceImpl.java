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
    public ProjMemberDao projMemberDao;

    @Override
    public List<ProjMember> getAllProjMember(){
        return projMemberDao.getAllProjMember();
    }
    
    @Override
    public String addProjMember(ProjMember projMember) {
        try {
            projMemberDao.addProjMember(projMember);
            return "Project Member Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editProjMemberInfo(String id, ProjMember projMember) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("projMember", projMember);

            projMemberDao.editProjMemberInfo(paramMap);

            return "Project Member Info Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteProjMember(String id) {
        try {
        
            projMemberDao.logicalDeleteProjMember(id);

            return "Project MemberDao Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
