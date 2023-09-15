package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.ProjInfoInput;
import com.controlcenter.controlcenter.model.ProjInfoOutput;

public interface ProjInfoService {
    
    public List<ProjInfoOutput> getAllProjInfo();
    public ProjInfoOutput getProjInfoById(String id);
    public String addProjInfo(ProjInfoInput projInfo);
    public String editProjInfoInfo(String id, ProjInfoInput projInfo);
    public String logicalDeleteProjInfo(String id);
    public String restoreProjInfo(String id);

}
