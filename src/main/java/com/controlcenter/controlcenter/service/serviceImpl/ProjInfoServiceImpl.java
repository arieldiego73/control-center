package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ProjInfoDao;
import com.controlcenter.controlcenter.model.ProjInfo;
import com.controlcenter.controlcenter.service.ProjInfoService;

@Service
public class ProjInfoServiceImpl implements ProjInfoService{
    
    @Autowired
    public ProjInfoDao projinfoDao;

    @Override
    public List<ProjInfo> getAllProjInfo(){
        return projinfoDao.getAllProjInfo();
    }
    
    @Override
    public String addProjInfo(ProjInfo projinfo) {
        try {
            projinfoDao.addProjInfo(projinfo);
            return "ProjInfo Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editProjInfoInfo(String id, ProjInfo projinfo) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("projinfo", projinfo);

            projinfoDao.editProjInfoInfo(paramMap);

            return "ProjInfo Info Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteProjInfo(String id) {
        try {
        
            projinfoDao.logicalDeleteProjInfo(id);

            return "ProjInfo Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
