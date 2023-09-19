package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.controlcenter.controlcenter.model.ProjMemberInput;
import com.controlcenter.controlcenter.model.ProjMemberOutput;

public interface ProjMemberService {

    public ResponseEntity<List<ProjMemberOutput>> getAllProjMember();

    public ProjMemberOutput getProjMemberById(String id);

    public String addProjMember(ProjMemberInput projMember, String emp_id);

    public String editProjMemberInfo(String id, ProjMemberInput projMember, String emp_id);

    public String logicalDeleteProjMember(String id, String emp_id);

    public String restoreProjMember(String id);
}
