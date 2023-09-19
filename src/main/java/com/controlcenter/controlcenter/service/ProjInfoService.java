package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.controlcenter.controlcenter.model.ProjInfoInput;
import com.controlcenter.controlcenter.model.ProjInfoOutput;

public interface ProjInfoService {
    
    public ResponseEntity<List<ProjInfoOutput>> getAllProjInfo();
    public ProjInfoOutput getProjInfoById(String id);
    public String addProjInfo(ProjInfoInput projInfo, String emp_id);
    public String editProjInfo(String id, ProjInfoInput projInfo, String emp_id);
    public String logicalDeleteProjInfo(String id, String emp_id);
    public String restoreProjInfo(String id, String emp_id);

}
