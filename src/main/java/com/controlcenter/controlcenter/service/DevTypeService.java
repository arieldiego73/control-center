package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.DevTypeInput;
import com.controlcenter.controlcenter.model.DevTypeOutput;



public interface DevTypeService {

    public ResponseEntity<List<DevTypeOutput>> getAllDevType();
    public DevTypeOutput getDevTypeById(String id);
    public String addDevType(DevTypeInput devType, String emp_id);
    public ResponseEntity<String> editDevTypeInfo(String id, DevTypeInput devType, String emp_id);
    public String logicalDeleteDevType(String id, String emp_id);
    public String deleteMultipleDevType(@RequestParam List<Long> ids, String emp_id);
    public String restoreDevType(String id);
}