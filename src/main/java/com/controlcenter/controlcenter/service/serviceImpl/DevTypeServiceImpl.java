package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.DevTypeDao;
import com.controlcenter.controlcenter.model.DevTypeInput;
import com.controlcenter.controlcenter.model.DevTypeOutput;
import com.controlcenter.controlcenter.service.DevTypeService;

@Service
public class DevTypeServiceImpl implements DevTypeService {
    @Autowired
    public DevTypeDao devTypeDao;

    @Override
    public List<DevTypeOutput> getAllDevType(){
        return devTypeDao.getAllDevType();
    }
    
    @Override
    public String addDevType(DevTypeInput devType) {
        try {
            devTypeDao.addDevType(devType);
            return "Development Type Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editDevTypeInfo(String id, DevTypeInput devType) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("devType", devType);

            devTypeDao.editDevTypeInfo(paramMap);

            return "Development Type Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteDevType(String id) {
        try {
            devTypeDao.logicalDeleteDevType(id);
            return "Development Type Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreDevType(String id) {
        try {
            devTypeDao.restoreDevType(id);
            return "Development Type Restored Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
