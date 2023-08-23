package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.SectionDao;
import com.controlcenter.controlcenter.model.Section;
import com.controlcenter.controlcenter.service.SectionService;

@Service
public class SectionServicempl implements SectionService{
    @Autowired
    public SectionDao sectionDao;

    @Override
    public List<Section> getAllSection() {
        return sectionDao.getAllSection();
    }


}
