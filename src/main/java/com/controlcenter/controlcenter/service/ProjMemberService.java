package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.ProjMember;

public interface ProjMemberService {
    
    public List<ProjMember> getAllProjMember();
    public String addProjMember(ProjMember projmember);
    public String editProjMemberInfo(String id, ProjMember projmember);
    public String logicalDeleteProjMember(String id);

}
