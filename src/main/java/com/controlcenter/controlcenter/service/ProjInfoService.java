package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.ProjInfo;

public interface ProjInfoService {
    
    public List<ProjInfo> getAllProjInfo();
    public String addProjInfo(ProjInfo projInfo);
    public String editProjInfoInfo(String id, ProjInfo projInfo);
    public String logicalDeleteProjInfo(String id);

}
