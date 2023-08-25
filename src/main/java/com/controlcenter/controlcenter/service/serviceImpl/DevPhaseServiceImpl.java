package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.DevPhaseDao;
import com.controlcenter.controlcenter.model.DevPhase;
import com.controlcenter.controlcenter.service.DevPhaseService;

@Service
public class DevPhaseServiceImpl implements DevPhaseService {
    
    @Autowired
    public DevPhaseDao devphaseDao;

    @Override
    public List<DevPhase> getAllDevPhase(){
        return devphaseDao.getAllDevPhase();
    }
    
    @Override
    public String addDevPhase(DevPhase devphase) {
        try {
            devphaseDao.addDevPhase(devphase);
            return "DevPhase Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editDevPhaseInfo(String id, DevPhase devphase) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("devphase", devphase);

            devphaseDao.editDevPhaseInfo(paramMap);

            return "DevPhase Info Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteDevPhase(String id) {
        try {
        
            devphaseDao.logicalDeleteDevPhase(id);

            return "DevPhase Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
