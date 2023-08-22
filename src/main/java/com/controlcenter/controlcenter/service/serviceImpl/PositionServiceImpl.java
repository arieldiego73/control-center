package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.PositionDao;
import com.controlcenter.controlcenter.model.Position;
import com.controlcenter.controlcenter.service.PositionService;

@Service
public class PositionServiceImpl implements PositionService{
    
    @Autowired 
    public PositionDao positionDao;

    @Override
    public List<Position> getAllPosition() {
        return positionDao.getAllPosition();
    }
}
