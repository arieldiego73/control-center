package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ProjInfoDao;
import com.controlcenter.controlcenter.model.ProjInfoInput;
import com.controlcenter.controlcenter.model.ProjInfoOutput;
import com.controlcenter.controlcenter.service.ProjInfoService;

@Service
public class ProjInfoServiceImpl implements ProjInfoService{
    
    @Autowired
    public ProjInfoDao projInfoDao;

    @Override
    public List<ProjInfoOutput> getAllProjInfo(){
        return projInfoDao.getAllProjInfo();
    }
    
    @Override
    public String addProjInfo(ProjInfoInput projInfo) {
        try {
            projInfoDao.addProjInfo(projInfo);
            return "Project Info Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editProjInfoInfo(String id, ProjInfoInput projInfo) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("projInfo", projInfo);

            projInfoDao.editProjInfoInfo(paramMap);

            return "Project Info Info Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteProjInfo(String id) {
        try {
        
            projInfoDao.logicalDeleteProjInfo(id);

            return "Project Info Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
