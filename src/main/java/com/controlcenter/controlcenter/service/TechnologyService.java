package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.Technology;

public interface TechnologyService {
    public List<Technology> getAllTechnology();
    public String addTechnology(Technology technology);
    public String editTechnology(String id, Technology technology);
    public String logicalDeleteTechnology(String id);
}
