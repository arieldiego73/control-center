package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.SectionDao;
import com.controlcenter.controlcenter.model.SectionInput;
import com.controlcenter.controlcenter.model.SectionOutput;
import com.controlcenter.controlcenter.service.SectionService;

@Service
public class SectionServiceImpl implements SectionService{

    @Autowired
    public SectionDao sectionDao;

    @Override
    public List<SectionOutput> getAllSection(){
        return sectionDao.getAllSection();
    }
    
    @Override
    public String addSection(SectionInput section) {
        try {
            sectionDao.addSection(section);
            return "Section added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editSectionInfo(String id, SectionInput section) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("section", section);

            sectionDao.editSectionInfo(paramMap);

            return "Section edited successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteSection(String id) {
        try {
        
            sectionDao.logicalDeleteSection(id);

            return "Section deleted successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String restoreSection(String id) {
        try {
        
            sectionDao.restoreSection(id);

            return "Section restored successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
