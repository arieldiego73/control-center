package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.DevTypeDao;
import com.controlcenter.controlcenter.model.DevType;
import com.controlcenter.controlcenter.service.DevTypeService;

@Service
public class DevTypeServiceImpl implements DevTypeService {
    @Autowired
    public DevTypeDao devtypeDao;

    @Override
    public List<DevType> getAllDevType(){
        return devtypeDao.getAllDevType();
    }
    
    @Override
    public String addDevType(DevType devType) {
        try {
            devtypeDao.addDevType(devType);
            return "DevType Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editDevTypeInfo(String id, DevType devtype) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("devtype", devtype);

            devtypeDao.editDevTypeInfo(paramMap);

            return "DevType Info Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteDevType(String id) {
        try {
        
            devtypeDao.logicalDeleteDevType(id);

            return "DevType Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
