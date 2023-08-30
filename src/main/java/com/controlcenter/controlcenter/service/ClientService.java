package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.Client;

public interface ClientService {
    
    public List<Client> getAllClient();
    public String addClient(Client client);
    public String editClient(String id, Client client);
    public String logicalDeleteClient(String id);
    public String restoreClient(String id);
}
