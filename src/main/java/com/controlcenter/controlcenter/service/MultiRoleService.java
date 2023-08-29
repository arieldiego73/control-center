package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.MultiRole;

public interface MultiRoleService {
    public List<MultiRole> getAllMultiRole();
    public String addMultiRole(MultiRole multirole);
    public String editMultiRoleInfo(String id, MultiRole multirole);
    public String logicalDeleteMultiRole(String id);
}
