package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.SectionDao;
import com.controlcenter.controlcenter.model.Section;
import com.controlcenter.controlcenter.service.SectionService;

@Service
public class SectionServiceImpl implements SectionService{

    @Autowired
    public SectionDao sectionDao;

    @Override
    public List<Section> getAllSection(){
        return sectionDao.getAllSection();
    }
    
    @Override
    public String addSection(Section section) {
        try {
            sectionDao.addSection(section);
            return "Section Added Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override 
    public String editSectionInfo(String id, Section section) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("section", section);

            sectionDao.editSectionInfo(paramMap);

            return "Section Info Edited Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteSection(String id, Section section) {
        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("id", id);
            paramMap.put("section", section);

            
            section.setDel_flag(1);
            sectionDao.logicalDeleteSection(paramMap);

            return "Section Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
