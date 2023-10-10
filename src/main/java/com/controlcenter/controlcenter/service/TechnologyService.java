package com.controlcenter.controlcenter.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.model.TechnologyInput;
import com.controlcenter.controlcenter.model.TechnologyOutput;

public interface TechnologyService {
    public ResponseEntity<List<TechnologyOutput>> getAllTechnology();

    public TechnologyOutput getTechnologyById(String id);

    public String addTechnology(TechnologyInput technology, String emp_id);

    public ResponseEntity<String> editTechnology(String id, TechnologyInput technology, String emp_id);

    public String logicalDeleteTechnology(String id, String emp_id);

    public String deleteMultipleTechnology(@RequestParam List<Long> ids, String emp_id);

    public String restoreTechnology(String id);
}
