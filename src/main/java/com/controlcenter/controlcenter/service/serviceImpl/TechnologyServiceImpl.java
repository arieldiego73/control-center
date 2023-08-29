package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.TechnologyDao;
import com.controlcenter.controlcenter.model.Technology;
import com.controlcenter.controlcenter.service.TechnologyService;

@Service
public class TechnologyServiceImpl implements TechnologyService{
    
    @Autowired
    public TechnologyDao technologyDao;

    @Override
    public List<Technology> getAllTechnology() {
        return technologyDao.getAllTechnology();
    }

    @Override
    public String addTechnology(Technology technology) {
        try {
            technologyDao.addTechnology(technology);
            return "Technology Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editTechnology(String id, Technology technology) {
        try {
            Map<String, Object> paramMap = new HashMap<>();

            paramMap.put("id", id);
            paramMap.put("technology", technology);

            technologyDao.editTechnology(paramMap);

            return "Technology Edited Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteTechnology(String id) {
        try {
            technologyDao.logicalDeleteTechnology(id);
            return "Technology Deleted Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

}
