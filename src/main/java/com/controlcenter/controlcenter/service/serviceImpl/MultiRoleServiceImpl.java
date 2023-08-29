package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.MultiRoleDao;
import com.controlcenter.controlcenter.model.MultiRole;
import com.controlcenter.controlcenter.service.MultiRoleService;

@Service
public class MultiRoleServiceImpl implements MultiRoleService{

    @Autowired
    public MultiRoleDao multiroleDao;

    @Override
    public List<MultiRole> getAllMultiRole(){
        return multiroleDao.getAllMultiRole();
    }

    @Override
    public String addMultiRole(MultiRole multirole){
        try{
            multiroleDao.addMultiRole(multirole);
            return "Multi Role Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editMultiRoleInfo(String id, MultiRole multirole){
        try{
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("multirole", multirole);

            multiroleDao.editMultiRoleInfo(paramMap);

            return "Multi Role Info Edited Successfully";
        } catch (Exception e){
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteMultiRole(String id){
        try{
            multiroleDao.logicalDeleteMultiRole(id);
            return "Multi Role Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
    
}
