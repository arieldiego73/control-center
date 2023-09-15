package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.ProjMemberInput;
import com.controlcenter.controlcenter.model.ProjMemberOutput;

@Mapper
public interface ProjMemberDao {
    List<ProjMemberOutput> getAllProjMember();

    ProjMemberOutput getProjMemberById(String id);

    void addProjMember(ProjMemberInput projMember);

    void editProjMemberInfo(Map<String, Object> paramMap);

    void logicalDeleteProjMember(String id);

    void restoreProjMember(String id);
}
