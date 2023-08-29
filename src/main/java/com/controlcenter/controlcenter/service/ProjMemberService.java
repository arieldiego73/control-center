package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.ProjMember;

public interface ProjMemberService {
    
    public List<ProjMember> getAllProjMember();
    public String addProjMember(ProjMember projMember);
    public String editProjMemberInfo(String id, ProjMember projMember);
    public String logicalDeleteProjMember(String id);

}
