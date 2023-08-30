package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.MultiRole;

public interface MultiRoleService {
    public List<MultiRole> getAllMultiRole();
    public String addMultiRole(MultiRole multiRole);
    public String editMultiRoleInfo(String id, MultiRole multiRole);
    public String logicalDeleteMultiRole(String id);
    public String restoreMultiRole(String id);
}
