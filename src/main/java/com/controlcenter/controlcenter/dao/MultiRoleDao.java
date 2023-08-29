package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.MultiRole;

@Mapper
public interface MultiRoleDao {
    List<MultiRole> getAllMultiRole();
    void addMultiRole(MultiRole multirole);
    void editMultiRoleInfo(Map<String, Object> paramMap);
    void logicalDeleteMultiRole(String id);
}
