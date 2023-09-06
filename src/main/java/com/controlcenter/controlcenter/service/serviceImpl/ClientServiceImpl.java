package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ClientDao;
import com.controlcenter.controlcenter.model.ClientInput;
import com.controlcenter.controlcenter.model.ClientOutput;
import com.controlcenter.controlcenter.service.ClientService;

@Service
public class ClientServiceImpl implements ClientService{
    
    @Autowired
    public ClientDao clientDao;

    @Override
    public List<ClientOutput> getAllClient() {
        return clientDao.getAllClient();
    }

    @Override
    public ClientOutput getClientById(String id){
        return clientDao.getClientById(id);
    }

    @Override
    public String addClient(ClientInput client) {

        try {
            clientDao.addClient(client);
            return "Client Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editClient(String id, ClientInput client) {
        try {
            ClientOutput data = clientDao.getClientById(id);
            data.setDel_flag(data.getDel_flag());
            if(data.getDel_flag() > 0) {
                return "Client does not exist.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();

                paramMap.put("id", id);
                paramMap.put("client", client);

                clientDao.editClient(paramMap);

                return "Client Edited Successfully.";
            }
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

    @Override
    public String restoreClient(String id) {
        try {
            clientDao.restoreClient(id);
            return "Client Restored Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
