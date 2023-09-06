package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.MultiRoleInput;
import com.controlcenter.controlcenter.model.MultiRoleOutput;

@Mapper
public interface MultiRoleDao {
    List<MultiRoleOutput> getAllMultiRole();

    MultiRoleOutput getMultiRoleById(String id);
    void addMultiRole(MultiRoleInput multiRole);
    void editMultiRoleInfo(Map<String, Object> paramMap);
    void logicalDeleteMultiRole(String id);
    void restoreMultiRole(String id);
}
