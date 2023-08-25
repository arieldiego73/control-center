package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.ProjMember;

@Mapper
public interface ProjMemberDao {
    List<ProjMember> getAllProjMember();
    void addProjMember(ProjMember projmember);
    void editProjMemberInfo(Map<String, Object> paramMap);
    void logicalDeleteProjMember(String id);

}
