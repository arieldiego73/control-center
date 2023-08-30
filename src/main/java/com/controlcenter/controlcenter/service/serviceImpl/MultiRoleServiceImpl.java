package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.MultiRoleDao;
import com.controlcenter.controlcenter.model.MultiRoleInput;
import com.controlcenter.controlcenter.model.MultiRoleOutput;
import com.controlcenter.controlcenter.service.MultiRoleService;

@Service
public class MultiRoleServiceImpl implements MultiRoleService{

    @Autowired
    public MultiRoleDao multiRoleDao;

    @Override
    public List<MultiRoleOutput> getAllMultiRole(){
        return multiRoleDao.getAllMultiRole();
    }

    @Override
    public String addMultiRole(MultiRoleInput multiRole){
        try{
            multiRoleDao.addMultiRole(multiRole);
            return "Multi Role Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editMultiRoleInfo(String id, MultiRoleInput multiRole){
        try{
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("multiRole", multiRole);

            multiRoleDao.editMultiRoleInfo(paramMap);

            return "Multi Role Edited Successfully";
        } catch (Exception e){
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteMultiRole(String id){
        try{
            multiRoleDao.logicalDeleteMultiRole(id);
            return "Multi Role Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreMultiRole(String id){
        try{
            multiRoleDao.restoreMultiRole(id);
            return "Multi Role Restored Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
