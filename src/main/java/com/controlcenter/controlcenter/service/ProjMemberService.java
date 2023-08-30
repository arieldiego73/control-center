package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.ProjMemberInput;
import com.controlcenter.controlcenter.model.ProjMemberOutput;

public interface ProjMemberService {
    
    public List<ProjMemberOutput> getAllProjMember();
    public String addProjMember(ProjMemberInput projMember);
    public String editProjMemberInfo(String id, ProjMemberInput projMember);
    public String logicalDeleteProjMember(String id);

}
