package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ClientDao;
import com.controlcenter.controlcenter.model.Client;
import com.controlcenter.controlcenter.service.ClientService;

@Service
public class ClientServiceImpl implements ClientService{
    
    @Autowired
    public ClientDao clientDao;

    @Override
    public List<Client> getAllClient() {
        return clientDao.getAllClient();
    }
}
