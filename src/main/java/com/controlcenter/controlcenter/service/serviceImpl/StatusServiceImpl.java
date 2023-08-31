package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.StatusDao;
import com.controlcenter.controlcenter.model.StatusInput;
import com.controlcenter.controlcenter.model.StatusOutput;
import com.controlcenter.controlcenter.service.StatusService;

@Service
public class StatusServiceImpl implements StatusService{

    @Autowired 
    public StatusDao statusDao;

    @Override
    public List<StatusOutput> getAllStatus(){
        return statusDao.getAllStatus();
    }

    @Override
    public String addStatus(StatusInput status){
        try{
            statusDao.addStatus(status);
            return "Status added successfully.";
        } catch(Exception e){
            return e.getMessage();
        }
    }

    @Override
    public String editStatusInfo(String code, StatusInput status){
        try{
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("code", code);
            paramMap.put("status", status);

            statusDao.editStatusInfo(paramMap);

            return "Status edited successfully.";
        } catch (Exception e){
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteStatus(String code){
        try{
            statusDao.logicalDeleteStatus(code);
            return "Status deleted successfully.";
        } catch (Exception e){
            return e.getMessage();
        }
    }

    @Override
    public String restoreStatus(String code){
        try{
            statusDao.restoreStatus(code);
            return "Status restored successfully.";
        } catch (Exception e){
            return e.getMessage();
        }
    }
}
