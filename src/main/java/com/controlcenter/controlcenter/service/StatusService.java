package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.StatusInput;
import com.controlcenter.controlcenter.model.StatusOutput;

public interface StatusService {

    public ResponseEntity<List<StatusOutput>> getAllStatus();

    public StatusOutput getStatusById(String id);

    public String addStatus(StatusInput status, String emp_id);

    public ResponseEntity<String> editStatusInfo(String code, StatusOutput status, String emp_id);

    public String logicalDeleteStatus(String code, String emp_id);

    public String deleteMultipleStatus(@RequestParam List<String> ids, String emp_id);

    public String restoreStatus(String code);
} 