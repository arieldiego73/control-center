package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.TechnologyDao;
import com.controlcenter.controlcenter.model.TechnologyInput;
import com.controlcenter.controlcenter.model.TechnologyOutput;
import com.controlcenter.controlcenter.service.TechnologyService;

@Service
public class TechnologyServiceImpl implements TechnologyService{
    
    @Autowired
    public TechnologyDao technologyDao;

    @Override
    public List<TechnologyOutput> getAllTechnology() {
        return technologyDao.getAllTechnology();
    }

    @Override
    public String addTechnology(TechnologyInput technology) {
        try {
            technologyDao.addTechnology(technology);
            return "Technology added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editTechnology(String id, TechnologyInput technology) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("technology", technology);
            technologyDao.editTechnology(paramMap);
            return "Technology edited successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteTechnology(String id) {
        try {
            technologyDao.logicalDeleteTechnology(id);
            return "Technology deleted successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreTechnology(String id) {
        try {
            technologyDao.restoreTechnology(id);
            return "Technology restored successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

}
