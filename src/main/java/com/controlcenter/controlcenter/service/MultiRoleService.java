package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.controlcenter.controlcenter.model.MultiRoleInput;
import com.controlcenter.controlcenter.model.MultiRoleOutput;

public interface MultiRoleService {
    public ResponseEntity<List<MultiRoleOutput>> getAllMultiRole();

    public MultiRoleOutput getMultiRoleById(String id);

    public String addMultiRole(String emp_id, Long role_ids, String emp_ID);

    public String editMultiRoleInfo(String id, MultiRoleInput multiRole, String emp_id);

    public String logicalDeleteMultiRole(String id, String emp_id);

    public String restoreMultiRole(String id);

    public String permaDeleteRole(String emp_id, Long role_id);

    public String deleteMultipleMultiRole(List<String> ids, String emp_id);
}
