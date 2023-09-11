package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.DevPhaseDao;
import com.controlcenter.controlcenter.model.DevPhaseInput;
import com.controlcenter.controlcenter.model.DevPhaseOutput;
import com.controlcenter.controlcenter.service.DevPhaseService;

@Service
public class DevPhaseServiceImpl implements DevPhaseService {
    
    @Autowired
    public DevPhaseDao devPhaseDao;

    @Autowired
    public ActivityLogDao activityLogDao;

    List<DevPhaseOutput> devPhaseList = new ArrayList<>();
    List<DevPhaseOutput> nullDevPhase = new ArrayList<>();

    @Override
    public ResponseEntity<List<DevPhaseOutput>> getAllDevPhase(){
        try {
            return ResponseEntity.ok(devPhaseDao.getAllDevPhase());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(nullDevPhase);
        }
    }
    
    @Override
    public String addDevPhase(DevPhaseInput devPhase) {
        try {
            devPhaseDao.addDevPhase(devPhase);
            return "Development Phase Added Successfully.";
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

            devPhaseList = devPhaseDao.getAllDevPhase();
            return "Development Phase Edited Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public ResponseEntity<String> logicalDeleteDevPhase(String id) {
        try {
            devPhaseDao.logicalDeleteDevPhase(id);
            devPhaseList = devPhaseDao.getAllDevPhase();
            return ResponseEntity.ok("Record is successfully deleted.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<String> deleteMultipleDevPhase(List<Long> ids) {
        try {
            devPhaseDao.deleteMultipleDevPhase(ids);
            devPhaseList = devPhaseDao.getAllDevPhase();
            return ResponseEntity.ok("Records are successfully deleted.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
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
