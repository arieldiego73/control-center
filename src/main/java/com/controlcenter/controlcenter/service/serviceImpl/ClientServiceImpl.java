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
    public String addClient(ClientInput client) {

        try {
            if(client.getClient_name() != null && client.getClient_sh_name() != null) {
                if((client.getClient_name().length() > 150 || client.getClient_name().length() < 1) || (client.getClient_sh_name().length() > 50 || client.getClient_sh_name().length() < 1)) {
                    return "The length of the data entered does not reach the specified length.";
                } else {
                    clientDao.addClient(client);
                    return "Client Added Successfully.";
                }
            } else {
                if(client.getClient_name() == null && client.getClient_sh_name() != null){
                    return "Client name should not be empty.";
                } else if(client.getClient_sh_name() == null && client.getClient_name() != null){
                    return "Client short name should not be empty.";
                } else{
                    return "All fields should not be empty.";
                }
            }
            
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editClient(String id, ClientInput client) {
        try {
            if(client.getClient_name() != null && client.getClient_sh_name() != null) {
                if((client.getClient_name().length() > 150 || client.getClient_name().length() < 1) || (client.getClient_sh_name().length() > 50 || client.getClient_sh_name().length() < 1)) {
                    return "The length of the data entered does not reach the specified length.";
                } else {
                    Map<String, Object> paramMap = new HashMap<>();

                    paramMap.put("id", id);
                    paramMap.put("client", client);

                    clientDao.editClient(paramMap);

                    return "Client Edited Successfully.";
                }
            } else {
                if(client.getClient_name() == null && client.getClient_sh_name() != null){
                    return "Client name should not be empty.";
                } else if(client.getClient_sh_name() == null && client.getClient_name() != null){
                    return "Client short name should not be empty.";
                } else{
                    return "All fields should not be empty.";
                }
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
