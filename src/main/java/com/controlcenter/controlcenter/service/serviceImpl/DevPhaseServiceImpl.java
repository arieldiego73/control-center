package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.DevPhaseDao;
import com.controlcenter.controlcenter.model.DevPhaseInput;
import com.controlcenter.controlcenter.model.DevPhaseOutput;
import com.controlcenter.controlcenter.service.DevPhaseService;

@Service
public class DevPhaseServiceImpl implements DevPhaseService {
    
    @Autowired
    public DevPhaseDao devPhaseDao;

    @Override
    public List<DevPhaseOutput> getAllDevPhase(){
        return devPhaseDao.getAllDevPhase();
    }
    
    @Override
    public String addDevPhase(DevPhaseInput devPhase) {
        try {
            devPhaseDao.addDevPhase(devPhase);
            return "Development Phase Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editDevPhaseInfo(String id, DevPhaseInput devPhase) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("devPhase", devPhase);

            devPhaseDao.editDevPhaseInfo(paramMap);

            return "Development Phase Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteDevPhase(String id) {
        try {
            devPhaseDao.logicalDeleteDevPhase(id);
            return "Development Phase Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreDevPhase(String id) {
        try {
            devPhaseDao.restoreDevPhase(id);
            return "Development Phase Restored Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
