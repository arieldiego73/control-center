package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Override
    public String addClient(Client client) {
        try {
            clientDao.addClient(client);
            return "Client Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editClient(String id, Client client) {
        try {
            Map<String, Object> paramMap = new HashMap<>();

            paramMap.put("id", id);
            paramMap.put("client", client);

            clientDao.editClient(paramMap);

            return "Client Edited Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String logicalDeleteClient(String id) {
        try {
            clientDao.logicalDeleteClient(id);
            return "Client Deleted Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
