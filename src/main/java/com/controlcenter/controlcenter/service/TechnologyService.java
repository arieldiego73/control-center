package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.TechnologyInput;
import com.controlcenter.controlcenter.model.TechnologyOutput;

public interface TechnologyService {
    public List<TechnologyOutput> getAllTechnology();

    public TechnologyOutput getTechnologyById(String id);

    public String addTechnology(TechnologyInput technology);

    public String editTechnology(String id, TechnologyInput technology);

    public String logicalDeleteTechnology(String id);

    public String deleteMultipleTechnology(@RequestParam List<Long> ids);

    public String restoreTechnology(String id);
}
